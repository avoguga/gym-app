import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 50px auto;
  grid-template-areas:
  'MH'
  'CT';
  /* 'FT' */
  height: 100vh;
`;