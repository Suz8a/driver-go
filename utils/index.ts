// @ts-ignore
import * as SendSMS from "react-native-sms-x";
import { PermissionsAndroid, ToastAndroid } from "react-native";

export const sendSMS = async (
  msg: string | undefined,
  tel: string | undefined,
  successMsg?: string
) => {
  if (msg && tel) {
    await PermissionsAndroid.request("android.permission.SEND_SMS");

    await SendSMS.send(1, `+52${tel}`, msg, () => {
      showNotification(successMsg || "Comando enviado con exito");
    });
  }
};

export const showNotification = (msg: string, duration?: "SHORT" | "LONG") => {
  ToastAndroid.show(msg, ToastAndroid[duration || "SHORT"]);
};
