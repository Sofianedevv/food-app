import { AntDesign } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants/COLORS';
import { useRootContext } from '../context/RootContext';
import { urlFor } from '../lib/image.sanity';
import CustomButton from '../components/ui/button';

export default function CartScreen() {
  const { cart, updateCar, handleCart } = useRootContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.map((item) => (count = count + item.total || item.price));
    setTotal(count);
  }, [cart]);

  return (
    <SafeAreaView style={styles.areaView}>
      <Text style={styles.title}>Shopping Cart</Text>
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={() => (
            <Text style={styles.name}>Your Cart is Empty 😭</Text>
          )}
          style={styles.cartContainer}
          data={cart}
          extraData={(item, index) => index}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 16 }} />}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: urlFor(item.image) }}
                style={styles.image}
              />
              <View styles={styles.cartInner}>
                <Text style={styles.name}>{item.name} </Text>
                <Text style={styles.price}>${item.total || item.price}</Text>

                <View style={styles.counter}>
                  <Pressable>
                    <AntDesign
                      onPress={() => handleCart(index, 'increment')}
                      style={styles.icon}
                      name="plussquareo"
                      size={24}
                      color={COLORS.whiteAlt}
                    />
                  </Pressable>

                  <Text style={styles.counterText}>{item.quantity}</Text>

                  <Pressable>
                    <AntDesign
                      onPress={() => handleCart(index, 'decrement')}
                      style={styles.icon}
                      name="minussquareo"
                      size={24}
                      color={COLORS.whiteAlt}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
        {total === 0 ? undefined : (
          <View style={styles.paymentContainer}>
            <Text style={styles.total}>${total}</Text>

            <CustomButton>
              <Text style={styles.checkout}>Checkout</Text>
            </CustomButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartContainer: {
    flex: 1,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginRight: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.white,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.container,
    padding: 16,
    borderRadius: 8,
  },
  cartInner: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  price: {
    fontSize: 26,
    marginVertical: 20,
    color: COLORS.white,
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    marginHorizontal: 18,
    fontSize: 28,
    color: COLORS.whiteAlt,
  },
  paymentContainer: {
    flex: 0.18,
  },
  total: {
    color: COLORS.primary,
    fontSize: 24,
    marginBottom: 16,
  },
  checkout: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
});
