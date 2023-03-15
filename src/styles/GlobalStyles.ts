import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
	  box-sizing: border-box !important;
    font-family: 'Roboto', sans-serif !important;
  }

  body {
    margin: 0 !important;
    
  }

  div {
    -webkit-box-sizing: border-box !important;
	  -moz-box-sizing: border-box !important;
	  -ms-box-sizing: border-box !important;
	  box-sizing: border-box !important;
  }

  button {
    padding: 0;
  }

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;
