// @ts-ignore
import * as SendSMS from "react-native-sms-x";
import { ToastAndroid } from "react-native";

export interface SendSMSProps {
  msg: string | undefined;
  tel: string | undefined;
  successMsg?: string;
  name?: "Start Engine" | "Stop Engine" | "Alarm On" | "Alarm Off";
}

export const sendSMS = async ({ msg, tel, successMsg, name }: SendSMSProps) => {
  if (!tel) showNotification("No se ha establecido el numero GPS", "LONG");
  if (!msg)
    showNotification(`No se ha establecido el comando${` ${name}`}`, "LONG");

  if (msg && tel) {
    await SendSMS.send(1, `+52${tel}`, msg, () => {
      showNotification(successMsg || "Comando enviado con exito");
    });
  }
};

export const showNotification = (msg: string, duration?: "SHORT" | "LONG") => {
  ToastAndroid.show(msg, ToastAndroid[duration || "SHORT"]);
};
