
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {}

const CountdownTimer: React.FC<Props> = () => {
  const [seconds, setSeconds] = useState<number>(60);

  let timer: NodeJS.Timeout;
  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(timer);
          return prevSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <Text style={{ color: Colors.main.primary._500 }}>{seconds}</Text>;
};

export default CountdownTimer;
