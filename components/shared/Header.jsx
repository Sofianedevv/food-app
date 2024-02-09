import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/COLORS';
import { useRootContext } from '../../context/RootContext';

export default function Header({ location }) {
  const { user } = useRootContext();
  return (
    <View style={styles.container}>
      {/* Left side */}
      <View style={styles.leftContainer}>
        <Feather name="map-pin" size={24} color={COLORS.primary} />
        <View style={styles.leftInnerContainer}>
          {location ? (
            <Text style={styles.location}>
              {location?.city}, {location?.region}
            </Text>
          ) : (
            <Text style={styles.location}>UNKNOWN</Text>
          )}
          <Text style={styles.name}>{user?.displayName || 'User'}</Text>
        </View>
      </View>

      {/* Right side */}
      <Image
        style={styles.avatar}
        source={{
          uri:
            user?.photoURL ||
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftInnerContainer: {
    marginLeft: 10,
  },
  location: {
    color: COLORS.whiteAlt,
    fontSize: 15,
  },
  name: {
    color: COLORS.whiteAlt,
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderColor: COLORS.primary,
    borderWidth: 3,
    borderRadius: 60 / 2,
  },
});
