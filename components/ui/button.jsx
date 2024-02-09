import { Platform, Pressable, StyleSheet } from 'react-native';

export default function CustomButton({ children, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: '#FAFAFA' }}
      style={({ pressed }) =>
        pressed && Platform.OS === 'ios'
          ? [styles.container, styles.pressed]
          : styles.container
      }
      onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2C94C',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: '#F9E29B',
    paddingHorizontal: 20,
  },
});
