import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReadMore from '@fawazahmed/react-native-read-more';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { urlFor } from '../lib/image.sanity';
import { COLORS } from '../constants/COLORS';
import CustomButton from '../components/ui/button';
import { useRootContext } from '../context/RootContext';
import { arrayRemove, arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Toast from 'react-native-toast-message';

export default function DetailScreen({ route, navigation }) {
  const dish = route.params;
  const { updateCart, user, favorites } = useRootContext();
  const [order, setOrder] = useState({
    name: dish.name,
    image: dish.image,
    price: dish.price,
    quantity: 1,
    ingredients: [],
  });
  const ingredients = [
    'Nutella',
    'Caramel',
    "Sirop d'érable",
    'Kinder',
    'KitKat',
  ];

  const chooseIngredient = function (index) {
    setOrder((currentOrder) => {
      const ingredient = ingredients[index];
      const isIngredientInOrder = currentOrder.ingredients.includes(
        ingredients[index]
      );

      if (isIngredientInOrder) {
        const filterIngredients = currentOrder.ingredients.filter(
          (item) => item !== ingredient
        );

        return {
          ...currentOrder,
          ingredients: filterIngredients,
        };
      } else {
        return {
          ...currentOrder,
          ingredients: [...currentOrder.ingredients, ingredient],
        };
      }
    });
  };

  const incrementQuantity = () =>
    setOrder((currentOrder) => ({
      ...currentOrder,
      quantity: currentOrder.quantity + 1,
      total: (dish.price * (currentOrder.quantity + 1)).toFixed(2),
    }));

  const decrementQuantity = () =>
    setOrder((currentOrder) => ({
      ...currentOrder,
      quantity: Math.max(currentOrder.quantity - 1, 1),
      total: (dish.price * Math.max(currentOrder.quantity - 1, 1)).toFixed(2),
    }));

  const toggleFavorite = async function () {
    const ref = doc(db, 'users', user.uid);
    const dishFavorite = { name: dish.name, id: dish._id };
    try {
      if (!favorites || favorites.length === 0) {
        return await setDoc(
          ref,
          { favorites: arrayUnion(dishFavorite) },
          { merge: true }
        );
      }

      favorites?.map(async (item) => {
        if (item.id === dish._id) {
          await setDoc(
            ref,
            { favorites: arrayRemove(dishFavorite) },
            { merge: true }
          );
        } else {
          await setDoc(
            ref,
            { favorites: arrayUnion(dishFavorite) },
            { merge: true }
          );
        }

        /*await setDoc(
          ref,
          {
            favorites:
              item.id === dish._id
                ? arrayRemove(dishFavorite)
                : arrayUnion(dishFavorite),
          },
          { merge: true }
        ); */
      });
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => navigation.goBack();
  const addToCart = () => {
    updateCart(order);

    Toast.show({
      type: 'success',
      text1: 'Product added',
      text2: `${dish.name} add to cart`,
    });
  };

  return (
    <View style={styles.container}>
      {/* Go back */}
      <Pressable onPress={goBack} style={styles.goBack}>
        <Ionicons name="arrow-back-circle" size={35} color="black" />
      </Pressable>

      {/* Favorite */}

      <Pressable onPress={toggleFavorite} style={styles.favorite}>
        <AntDesign
          name={
            favorites?.some((favorite) => favorite.id === dish._id)
              ? 'heart'
              : 'hearto'
          }
          size={20}
          color={COLORS.white}
        />
      </Pressable>

      <Image source={{ uri: urlFor(dish.image) }} style={styles.image} />

      <SafeAreaView style={styles.wrapContent}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.name}>{dish.name}</Text>
            {/* Description */}
            <View>
              <Text style={styles.title}>Description</Text>
              <ReadMore
                seeMoreText="read more"
                seeLessText="hide"
                seeMoreStyle={styles.readMore}
                seeLessStyle={styles.readMore}
                numberOfLines={4}
                style={styles.description}>
                {dish.description}
              </ReadMore>
            </View>

            {/* Ingredients */}
            <View style={styles.ingredientsContainer}>
              <Text style={styles.title}>Choose your ingredients</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {ingredients.map((item, index) => (
                  <Pressable
                    onPress={() => chooseIngredient(index)}
                    style={
                      order.ingredients.includes(ingredients[index])
                        ? [styles.ingredient, styles.ingredientAdded]
                        : styles.ingredient
                    }
                    key={item}>
                    <Text style={styles.ingredientText}>{item}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.bottom}>
              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Price</Text>
                <Text style={styles.price}>${order.total || dish.price}</Text>
              </View>

              {/* Quantity */}
              <View style={styles.quantityContainer}>
                {/* Decrement */}
                <Pressable onPress={decrementQuantity}>
                  <AntDesign
                    name="minuscircleo"
                    size={30}
                    color={COLORS.primary}
                  />
                </Pressable>
                <Text style={styles.quantity}>{order.quantity}</Text>
                <Pressable onPress={incrementQuantity}>
                  <AntDesign
                    name="pluscircleo"
                    size={30}
                    color={COLORS.primary}
                  />
                </Pressable>
              </View>
            </View>

            {/* Button payment */}
            <CustomButton onPress={addToCart}>
              <Text style={styles.buttonText}>Add to Order</Text>
            </CustomButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBack: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 10,
  },
  favorite: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 10,
    backgroundColor: COLORS.secondary,
    padding: 6,
    borderRadius: 40,
  },
  image: {
    flex: 1,
  },
  wrapContent: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.secondary,
    marginTop: -40,
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 23,
    color: COLORS.white,
    //  textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: 'Poppins',
    marginBottom: 12,
  },
  readMore: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    color: COLORS.whiteAlt,
  },
  ingredientsContainer: {
    marginTop: 25,
  },
  ingredient: {
    backgroundColor: COLORS.container,
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  ingredientAdded: {
    backgroundColor: COLORS.primary,
  },
  ingredientText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  bottom: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceTitle: {
    color: COLORS.whiteAlt,
    fontSize: 18,
  },
  price: {
    fontSize: 38,
    color: COLORS.white,
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 30,
    color: COLORS.white,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
