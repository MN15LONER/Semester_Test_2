import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../context/userContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useUser();

  const handleAdd = async () => {
    try {
      await addToCart(product, 1);
      Alert.alert('Added', 'Product added to cart');
      navigation.navigate('Cart');
    } catch (err) {
      Alert.alert('Error', 'Could not add to cart');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: 'white' },
  image: { width: 200, height: 200, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  price: { fontSize: 18, color: 'green', marginBottom: 8 },
  category: { fontSize: 14, color: 'grey', textTransform: 'capitalize', marginBottom: 12 },
  description: { fontSize: 14, color: '#444', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
