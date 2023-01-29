import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";

import { FC, ReactNode } from "react";

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
  margin: 0 ;
  padding: 0;
}
body{
  background: #E4EBFA;
}

`;
const theme = {
  colors: {
    mainPurple: "#635FC7",
    white: "#FFFFFF",
    mediumGrey: "#828FA3",
  },
};

interface Props {
  children: ReactNode;
}

const Theme: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  );
};
export default Theme;
