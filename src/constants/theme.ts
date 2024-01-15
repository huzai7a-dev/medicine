import { ThemeConfig, extendTheme } from "@chakra-ui/react";

export const COLOR_SCHEME = "green";
const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
});

export default theme;
