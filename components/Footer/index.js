import Navbar from "@/Components/Navbar";
import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  padding: 1rem;
  bottom: 0;
  background: grey;
  display: flex;
  justify-content: space-between;
`;
//Hallo
const Footer = () => {
  return (
    <StyledFooter>
      <Navbar />
    </StyledFooter>
  );
};

export default Footer;
