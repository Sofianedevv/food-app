import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants/COLORS';
import { sanity } from '../lib/sanity';
import { urlFor } from '../lib/image.sanity';
import { useRootContext } from '../context/RootContext';

export default function CategoryList() {
  const { onChangeCategoryHandler } = useRootContext();
  const [active, setActive] = useState(0);
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    (async () => {
      const data = await sanity.fetch('*[_type == "categories"]');
      const all = {
        name: 'Tous',
        image:
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      };
      setCategories([all, ...data]);
    })();
  }, []);

  const onPressHandler = (index) => {
    setActive(index);
    // Update category selected from root context
    onChangeCategoryHandler(index === 0 ? null : categories[index]._id);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories?.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => onPressHandler(index)}
            style={
              active === index
                ? [styles.category, styles.active]
                : styles.category
            }>
            <Image
              source={{ uri: index === 0 ? item.image : urlFor(item.image) }}
              style={[
                active === index
                  ? [styles.image, styles.imageActive]
                  : styles.image,
              ]}
            />

            <View style={styles.textContainer}>
              <Text
                style={
                  active === index
                    ? [styles.categoryText, styles.activeText]
                    : styles.categoryText
                }>
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  category: {
    width: 150,
    backgroundColor: COLORS.container,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: "70%",
    opacity: 0.6,
  },
  imageActive: {
    opacity: 1,
  },
  textContainer: {
    padding: 20,
    paddingTop: 8
  },
  active: {
    backgroundColor: COLORS.primary,
  },
  activeText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  categoryText: {
    color: COLORS.whiteAlt,
    textAlign: 'center',
  },
});
