import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageContext } from "../providers/async-storage-provider";

type UseAsyncStorageResult = [any, (value: any) => Promise<void>];

export function useAsyncStorage(
  key: string,
  initialValue: any
): UseAsyncStorageResult {
  const [storedValue, setStoredValue] = useContext(AsyncStorageContext) as any;

  async function getStoredItem(key: string, initialValue: any) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue((currentStoredValue: any) => ({
        ...currentStoredValue,
        [key]: value,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStoredItem(key, initialValue);
  }, [key]);

  const setValue = useCallback(async (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue((currentStoredValue: any) => ({
        ...currentStoredValue,
        [key]: valueToStore,
      }));
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [storedValue[key], setValue];
}
