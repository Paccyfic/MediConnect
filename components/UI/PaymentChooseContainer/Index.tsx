import { View } from "@/components/Themed";
import { PaymentOption } from "@/constants/Types";
import { useContext, useState } from "react";
import PaymentChooseInputCard from "./PaymentChooseInputCard";
import { ThemeContext } from "@/ctx/ThemeContext";
import { Colors } from "@/constants/Colors";

interface Props {
  data: PaymentOption[];
}

export default function PaymentChooseContainer({ data }: Props) {
  const [selectedOption, setSelectedOption] = useState(0);
  const { theme } = useContext(ThemeContext);
  
  function handleSelect(index: number) {
    console.log(index);
    setSelectedOption(index);
  }

  return (
    <>
      <View
        style={{
          gap: 25,
          backgroundColor:
            theme === "light" ? Colors.others.white : Colors.dark._1,
        }}
      >
        {data.map((paymentOption) => {
          return (
            <>
              <PaymentChooseInputCard
                key={paymentOption.id}
                icon={
                  theme === "light"
                    ? paymentOption.iconSvgStringLight
                    : paymentOption.iconSvgStringDark ??
                      paymentOption.iconSvgStringLight
                }
                title={paymentOption.title}
                onPress={() => {
                  handleSelect(paymentOption.id);
                }}
                selected={paymentOption.id === selectedOption}
              />
            </>
          );
        })}
      </View>
    </>
  );
}
