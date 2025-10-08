import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../context/userContext';

export default function CartScreen() {
  const { cart, setItemQuantity, removeItem, clearCart } = useUser();

  const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>${item.price} x {item.quantity}</Text>
        <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.ctrlBtn} onPress={() => setItemQuantity(item.id, item.quantity - 1)}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctrlBtn} onPress={() => setItemQuantity(item.id, item.quantity + 1)}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.id)}>
            <Text style={{ color: 'white' }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList data={cart} keyExtractor={(i) => i.id.toString()} renderItem={renderItem} contentContainerStyle={{ padding: 12 }} />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => Alert.alert('Checkout', 'Not implemented')}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  itemRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  image: { width: 80, height: 80, borderRadius: 8 },
  title: { fontWeight: 'bold' },
  price: { color: 'green' },
  subtotal: { color: '#666' },
  controls: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  ctrlBtn: { padding: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginRight: 8 },
  removeBtn: { backgroundColor: 'red', padding: 8, borderRadius: 6 },
  footer: { padding: 12, borderTopWidth: 1, borderColor: '#eee' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutBtn: { backgroundColor: 'blue', padding: 12, alignItems: 'center', borderRadius: 8 },
});
