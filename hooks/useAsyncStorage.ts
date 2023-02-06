import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UseAsyncStorageResult = [any, (value: any) => Promise<void>];

export function useAsyncStorage(
  key: string,
  initialValue: any
): UseAsyncStorageResult {
  const [storedValue, setStoredValue] = useState();

  async function getStoredItem(key: string, initialValue: any) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStoredItem(key, initialValue);
  }, [key, initialValue]);

  const setValue = async (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
