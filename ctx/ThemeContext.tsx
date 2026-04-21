import { ThemeType } from "@/constants/Types";
import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface ContextType {
  theme: ThemeType;
  changeTheme: (theme: "light" | "dark") => void;
}

export const ThemeContext = createContext<ContextType>({
  theme: null,
  changeTheme: (theme: "light" | "dark") => {},
});

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
  theme: ThemeType;
}

export default function ThemeProvider({ children, theme: value }: Props) {
  const [theme, setTheme] = useState<ThemeType>(value);

  async function changeTheme(theme: "light" | "dark") {
    setTheme(theme);
    await SecureStore.setItemAsync("theme", theme!);
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
