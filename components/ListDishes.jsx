import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { sanity } from '../lib/sanity';
import { urlFor } from '../lib/image.sanity';
import { COLORS } from '../constants/COLORS';
import { useRootContext } from '../context/RootContext';

export default function ListDishes() {
  const { width } = useWindowDimensions();
  const [dishes, setDishes] = useState(undefined);
  const { categorySelected } = useRootContext();
  const navigation = useNavigation();

  useEffect(() => {
    (async function () {
      const query = categorySelected
        ? `*[_type == "dishes" &&  category._ref == "${categorySelected}"]`
        : `*[_type == "dishes"]`;
      const data = await sanity.fetch(query);

      setDishes(data);
    })();
  }, [categorySelected]);

  const onPressHandler = (dish) => navigation.navigate('Detail', dish);

  return (
    <View style={styles.containerCard}>
      <Text style={styles.title}>Special for you</Text>

      <FlatList
        data={dishes}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressHandler(item)}
            style={[styles.containerDish, { width: width / 2 - 30 }]}>
            <Image source={{ uri: urlFor(item.image) }} style={styles.image} />

            <View style={styles.containerText}>
              <Text style={styles.name}>{item.name} </Text>

              {/* Review and price */}
              <View style={styles.infoWrap}>
                <View style={styles.review}>
                  <AntDesign name="star" size={18} color={COLORS.primary} />
                  <Text style={[styles.textInfo, styles.textReview]}>4.0</Text>
                </View>

                <Text style={styles.textInfo}>${item.price}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flex: 2,
    paddingTop: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.white,
  },
  separator: {
    marginVertical: 10,
  },
  containerDish: {
    backgroundColor: COLORS.container,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  containerText: {
    height: 100,
    padding: 8,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '600',
  },
  infoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  textInfo: {
    fontSize: 16,
    color: COLORS.whiteAlt,
  },
  textReview: { marginLeft: 5 },
});
