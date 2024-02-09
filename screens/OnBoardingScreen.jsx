import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/ui/button';
import { COLORS } from '../constants/COLORS';

const image = require('../assets/images/background-img.png');

export default function OnBoardingScreen({ navigation }) {
  // Ajouter dans le local storage une propriete `alReadyLaunched`
  // Ayant pour valeur `true` (boolean)
  const goNext = async function () {
    try {
      await AsyncStorage.setItem('alreadyLaunched', "true");
      navigation.push('login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={image}
        style={styles.imageBackground}>
        <LinearGradient
          colors={['transparent', COLORS.secondary]}
          end={{ x: 0.4, y: 0.78 }}
          style={styles.linear}>
          <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>
                The Most <Text style={styles.textYellow}>Delicious</Text> Food
              </Text>
              <Text style={styles.description}>
                With delicious food and an impressive drinks menu, there's
                something for everyone.
              </Text>
              {/* Button */}
              <CustomButton onPress={goNext}>
                <Text style={styles.textButton}>Get Started</Text>
              </CustomButton>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linear: {
    flex: 1,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 70,
    color: COLORS.white,
    fontWeight: '600',
  },
  textYellow: {
    color: COLORS.primary,
  },
  description: {
    fontSize: 24,
    color: COLORS.whiteAlt,
    marginBottom: 60,
    marginTop: 20,
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: COLORS.white,
  },
});
