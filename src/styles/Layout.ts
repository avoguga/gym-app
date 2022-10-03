import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 70px auto 70px;
  grid-template-areas:
  'MH'
  'CT'
  'FT';
  height: 100vh;
`;