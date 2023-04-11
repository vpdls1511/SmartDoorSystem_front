import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  *, *::before, *::after {
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
	}
`

export default GlobalStyled
