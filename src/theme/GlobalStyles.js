import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   html {
     scroll-behavior: smooth;
     scroll-padding-top: 81px;
   }

   body {
     background: ${({ theme }) => theme.background};
     color: ${({ theme }) => theme.color};
     transition: all 0.50s linear; 
  }
`;

export default GlobalStyles;
