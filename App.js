import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUser } from './context/userContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, initializing } = useUser();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'ShopEZ - Login' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'ShopEZ - Register' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Products" component={ProductScreen} options={{ title: 'ShopEZ Products' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
