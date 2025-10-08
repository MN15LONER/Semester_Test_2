import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signOut } from '../firebase';
import { ref, onValue, set, update, remove } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../firebase';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [cart, setCart] = useState([]);

  // Helper: save cart to AsyncStorage
  const persistLocal = async (items) => {
    try {
      await AsyncStorage.setItem('@shez_cart', JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to persist cart locally', err);
    }
  };

  // Load local cart (used if no network)
  const loadLocalCart = async () => {
    try {
      const raw = await AsyncStorage.getItem('@shez_cart');
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to load local cart', err);
    }
    return [];
  };

  // Sync functions that write to Realtime DB under /carts/{uid}
  const writeCartToDB = async (uid, items) => {
    if (!uid) return;
    try {
      await set(ref(database, `carts/${uid}`), items);
    } catch (err) {
      console.warn('DB write failed', err);
    }
  };

  // Add to cart (merge if exists)
  const addToCart = async (product, qty = 1) => {
    const existing = cart.find((c) => c.id === product.id);
    let next;
    if (existing) {
      next = cart.map((c) => (c.id === product.id ? { ...c, quantity: c.quantity + qty } : c));
    } else {
      next = [...cart, { id: product.id, title: product.title, price: product.price, image: product.image, quantity: qty }];
    }
    setCart(next);
    persistLocal(next);
    if (user) await writeCartToDB(user.uid, next);
  };

  const setItemQuantity = async (id, quantity) => {
    let next = cart.map((c) => (c.id === id ? { ...c, quantity: Math.max(0, quantity) } : c));
    next = next.filter((c) => c.quantity > 0);
    setCart(next);
    persistLocal(next);
    if (user) await writeCartToDB(user.uid, next);
  };

  const removeItem = async (id) => {
    const next = cart.filter((c) => c.id !== id);
    setCart(next);
    persistLocal(next);
    if (user) await writeCartToDB(user.uid, next);
  };

  const clearCart = async () => {
    setCart([]);
    persistLocal([]);
    if (user) await writeCartToDB(user.uid, []);
  };

  // Listen to auth state and cart DB
  useEffect(() => {
    let cartOff = null;
    const unsub = onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        // start listening to DB for this user; unsubscribe previous if exists
        if (cartOff) {
          try { cartOff(); } catch (e) {}
          cartOff = null;
        }
        const cartRef = ref(database, `carts/${fbUser.uid}`);
        cartOff = onValue(
          cartRef,
          async (snapshot) => {
            const val = snapshot.val();
            if (val) {
              setCart(val);
              persistLocal(val);
            } else {
              // no cart in DB, try local
              const local = await loadLocalCart();
              setCart(local);
            }
          },
          (err) => {
            console.warn('Cart listener error', err);
          }
        );

        setInitializing(false);
      } else {
        setUser(null);
        // unsub any cart listener
        if (cartOff) {
          try { cartOff(); } catch (e) {}
          cartOff = null;
        }
        // load local cart so user sees something while signed out
        loadLocalCart().then((local) => setCart(local));
        setInitializing(false);
      }
    });
    return () => {
      try { unsub(); } catch (e) {}
      if (cartOff) {
        try { cartOff(); } catch (e) {}
      }
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(null);
      setCart([]);
    } catch (err) {
      console.warn('Sign out error', err);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, initializing, cart, addToCart, setItemQuantity, removeItem, clearCart, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

