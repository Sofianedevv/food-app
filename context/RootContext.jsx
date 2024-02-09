import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const RootContext = createContext();

export default function RootProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(undefined);
  const [categorySelected, setCategorySelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const observer = onAuthStateChanged(auth, async function (user) {
      if (user) {
        setUser(user);
        return setIsConnected(true);
      } else {
        setUser(undefined);
        return setIsConnected(false);
      }
    });

    return () => {
      observer;
    };
  }, []);

  useEffect(() => {
    let unsubscribe;

    if (user?.uid) {
      const ref = doc(db, 'users', user?.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        const data = doc.data();

        if (data) {
          setFavorites(data.favorites);
        }
      });
    }

    return () => {
      unsubscribe;
    };
  }, [user]);

  const onChangeCategoryHandler = (category) => setCategorySelected(category);
  const updateCart = (order) => setCart([...cart, order]);

  const handleCart = (index, type) =>
    setCart((currentState) => {
      const copyState = [...currentState];
      const productCart = copyState[index];
      console.log(productCart);
      if (type === 'increment') {
        productCart.quantity = productCart.quantity + 1;

        productCart.total = (productCart.quantity * productCart.price).toFixed(
          2
        );

        return copyState;
      }
    });

  const value = {
    isConnected,
    user,
    categorySelected,
    cart,
    favorites,
    onChangeCategoryHandler,
    updateCart,
    handleCart,
  };

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

export function useRootContext() {
  const value = useContext(RootContext);

  return value;
}
