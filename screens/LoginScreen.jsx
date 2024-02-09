// rnfs => avec styles
// rnf => sans styles

import {
  Alert,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import Dialog from 'react-native-dialog';
import { AntDesign } from '@expo/vector-icons';

import { COLORS } from '../constants/COLORS';
import CustomButton from '../components/ui/button';
import { auth } from '../lib/firebase';

const image = require('../assets/images/image-login.png');

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleModalVisible = () => setModalVisible(!modalVisible);

  // Create a new account
  const registerHandler = async function () {
    try {
      if (email && password && password === passwordConfirm) {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (user && name) {
          await updateProfile(user, { displayName: name });
        }

        /* Show toast */
        Toast.show({
          type: 'success',
          text1: 'Welcome Aboard!',
          text2:
            "Your registration has been completed successfully. We're thrilled to have you with us!",
        });
      } else {
        Alert.alert(
          'Error',
          "It looks like you've missed some important fields. Check the form and fill in the blanks to move forward.",
          [{ text: 'Oupss !', style: 'destructive' }]
        );
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error 🚨',
        text2: error.message,
      });
    }
  };

  // Log user
  const loginHandler = async function () {
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
        /* Show toast */
        Toast.show({
          type: 'success',
          text1: 'Happy to See You Again!',
          text2: 'You are now logged in. Welcome back and enjoy our service.',
        });
      } else {
        Alert.alert(
          'Error',
          "It looks like you've missed some important fields. Check the form and fill in the blanks to move forward.",
          [{ text: 'Oupss !', style: 'destructive' }]
        );
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error 🚨',
        text2: error.message,
      });
    }
  };

  const toggleDialog = () => setDialogVisible(!dialogVisible);

  const recoveryPasswordHandler = async function () {
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email);

        Toast.show({
          type: 'success',
          text1: 'Password Reset',
          text2:
            "No worries! Follow the instructions we've sent to your email to reset your password.",
        });
      } else {
        Alert.alert('Error', 'Please provide a valid email', [
          { text: 'Oupss !', style: 'destructive' },
        ]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error 🚨',
        text2: error.message,
      });
    }
    /*
    Alert.alert('Confirmation', 'Are you sure to recovery your password', [
      { text: 'Cancel', style: 'destructive' },
      { text: 'Recovery', onPress: recovery },
    ]);
    */
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.imageBackground} />
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Fast Good</Text>
          {/* Formulaire  */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.secondary}
              keyboardType="email-address"
              inputMode="email"
              onChangeText={(textEntered) => setEmail(textEntered)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.secondary}
              inputMode="text"
              secureTextEntry
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={(textEntered) => setPassword(textEntered)}
            />
            {/* Recover password */}
            <Pressable onPress={toggleDialog}>
              <Text style={styles.recovery}>Recovery password</Text>
            </Pressable>
            {/* Dialog Recovery Password */}
            <Dialog.Container visible={dialogVisible}>
              <Dialog.Title>Recovery Password</Dialog.Title>
              <Dialog.Description>
                Receive an email reset password
              </Dialog.Description>
              <Dialog.Input
                keyboardType="email-address"
                inputMode="email"
                autoCorrect={false}
                onChangeText={(textEntered) => setEmail(textEntered)}
              />
              <Dialog.Button
                color={COLORS.red}
                label="Cancel"
                onPress={toggleDialog}
              />
              <Dialog.Button
                onPress={recoveryPasswordHandler}
                label="Confirm"
              />
            </Dialog.Container>

            {/* submit form */}
            <CustomButton onPress={loginHandler}>
              <Text style={styles.textButton}>Login</Text>
            </CustomButton>

            {/* Don't have an account */}
            <View style={styles.containerTextCreate}>
              <Text style={styles.text}>Don't have an account ? </Text>
              <Pressable onPress={handleModalVisible}>
                <Text style={styles.textCreate}>Create an account</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Modal visible={modalVisible} animationType="slide">
          <SafeAreaView style={styles.container}>
            <Pressable
              onPress={handleModalVisible}
              style={styles.closeContainer}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>

            {/* Form */}
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Fast Good</Text>
              {/* Formulaire  */}
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={COLORS.secondary}
                  inputMode="text"
                  onChangeText={(textEntered) => setName(textEntered)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.secondary}
                  keyboardType="email-address"
                  inputMode="email"
                  onChangeText={(textEntered) => setEmail(textEntered)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.secondary}
                  inputMode="text"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onChangeText={(textEntered) => setPassword(textEntered)}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Repeat your password"
                  placeholderTextColor={COLORS.secondary}
                  inputMode="text"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onChangeText={(textEntered) =>
                    setPasswordConfirm(textEntered)
                  }
                />
                <CustomButton onPress={registerHandler}>
                  <Text style={styles.textButton}>Register</Text>
                </CustomButton>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 4,
    padding: 8,
    paddingVertical: 12,
    marginBottom: 18,
  },
  recovery: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 18,
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: COLORS.white,
  },
  containerTextCreate: {
    marginTop: 14,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textCreate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  closeContainer: {
    position: 'absolute',
    right: 30,
    top: 50,
  },
});
