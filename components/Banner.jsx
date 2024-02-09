import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/COLORS';
const img = require('../assets/images/burger.png');

export default function Banner() {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.imageBackground}>
        <LinearGradient
          style={styles.linearGradient}
          end={{ x: 0.23, y: 0.25 }}
          colors={['transparent', '#c19906f5']}>
          {/* Content */}
          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, styles.titleWrap]}>BUY GET</Text>
              <Text style={[styles.title, styles.largeTitle]}>1</Text>
            </View>
            <Text style={styles.subtitle}>Hamburger</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 170,
    width: '100%',
    marginTop: 30,
    borderRadius: 8,
    overflow: 'hidden',
    // Shadow for Android
    elevation: 5,

    // Shadow for IOS
    shadowColor: COLORS.whiteAlt,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0.6,
      height: 2,
    },
  },
  imageBackground: {
    flex: 1,
    height: '100%',
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  innerContainer: {
    transform: [{ rotate: '-9deg' }],
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.whiteAlt,
  },
  titleWrap: {
    width: 90,
    lineHeight: 33,
    paddingTop: 10
  },
  largeTitle: {
    fontSize: 70,
    marginLeft: -5,
    marginTop: -15,
  },
  subtitle: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: -35,
    fontFamily: 'Mr-Dafoe',
  },
});
