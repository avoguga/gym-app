import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Titillium+Web:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
    padding: 0;
    margin: 0;
	  box-sizing: border-box !important;
    font-family: 'Inter', sans-serif !important;
    font-family: 'Lato', sans-serif !important;
    font-family: 'Titillium Web', sans-serif !important;
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
