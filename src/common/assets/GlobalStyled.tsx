import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
	}
`

export default GlobalStyled
