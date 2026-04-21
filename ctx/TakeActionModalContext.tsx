import { View } from "@/components/Themed";
import { ModalType } from "@/constants/Types";
import React, { createContext, useContext, useState } from "react";
import { Text } from "react-native";

const ModalContext = createContext<ModalType>({
  visible: false,
  show: ({ children }) => {},
  hide: () => {},
  content: { children: null },
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export default function ModalProvider({ children }: Props) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<{
    children: React.JSX.Element | React.JSX.Element[] | null;
  }>({ children: null });

  async function show({
    children,
  }: {
    children: React.JSX.Element | React.JSX.Element[];
  }) {
    if (children !== null) {
      setContent({ children });
      setVisible(true);
    }
  }

  async function hide() {
    setVisible(false);
    setContent({ children: null });
  }

  const value = {
    visible,
    show,
    hide,
    content,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
