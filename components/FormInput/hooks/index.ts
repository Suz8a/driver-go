import { useCallback, useState } from "react";

export const useFormInput = () => {
  const [value, setValue] = useState<string>("");

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text);
    },
    [setValue]
  );

  return {
    value,
    onChangeText,
  };
};
