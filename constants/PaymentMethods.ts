import {
  applePayDark,
  applePayLight,
  googlePay,
  masterCardDark,
  masterCardLight,
  paypal,
} from "@/components/UI/Icons";
import { PaymentOption } from "./Types";

export const PaymentMethods: PaymentOption[] = [
  { id: 0, title: "Paypal", iconSvgStringLight: paypal },
  {
    id: 1,
    title: "Google Pay",
    iconSvgStringLight: googlePay,
  },
  {
    id: 2,
    title: "Apple Pay",
    iconSvgStringLight: applePayLight,
    iconSvgStringDark: applePayDark,
  },
  {
    id: 3,
    title: "•••• •••• •••• •••• 4679",
    iconSvgStringLight: masterCardLight,
    iconSvgStringDark: masterCardDark,
  },
];
