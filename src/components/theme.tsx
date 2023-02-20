import React, { Dispatch, ReactNode, SetStateAction } from "react";

type ThemeContextType =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk";

interface ThemeContextProps {
  themeType: ThemeContextType;
  setCurrentTheme: Dispatch<SetStateAction<ThemeContextType>> | null;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: "forest",
  setCurrentTheme: null,
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] =
    React.useState<ThemeContextType>("forest");

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
