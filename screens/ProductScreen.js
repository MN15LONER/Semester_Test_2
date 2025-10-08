import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';

import { useUser } from '../context/userContext';

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { logout, user } = useUser();

  // Fetch products from API
  const fetchProducts = async () => {
    try 
    {
      setLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setError(null);
    } 
    catch (err) 
    {
      setError(err.message);
      Alert.alert('Error', 'Failed to load products');
    } 
    finally
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // add header button for cart and logout
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 12 }}>
            <Text style={{ color: '#007AFF', marginRight: 8 }}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()}>
            <Text style={{ color: 'red', marginRight: 8 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, logout]);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(['all', ...resp.data]);
    } catch (err) {
      console.warn('Failed to load categories', err);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const resp = await axios.get(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
      setProducts(resp.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      Alert.alert('Error', 'Failed to load products for category');
    } finally {
      setLoading(false);
    }
  };

  // Render each product item
  const renderProductItem = ({ item }) => {
    return(
       <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
    <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
    <View style={styles.productInfo}>
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
    </View>
    </TouchableOpacity>
    )
  };


  if (loading) 
  {
    return(
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>error</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Category filter */}
      <View style={{ flexDirection: 'row', padding: 8 }}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => {
            setSelectedCategory(cat);
            if (cat === 'all') fetchProducts(); else fetchProductsByCategory(cat);
          }} style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}>
            <Text style={[styles.categoryText, selectedCategory === cat && { color: 'white' }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
      {/* fallback logout button for small screens */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => logout()}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'grey',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  listContent: {
    padding: 10,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  productDescription: {
    fontSize: 12,
    color: 'grey',
  },
  retryButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
