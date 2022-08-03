import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default function useAsyncStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState();

  const getStoredItem = async (key: string, initialValue: string) => {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  const setValue = async (value: string | Function) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoredItem(key, initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
