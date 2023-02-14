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

  border-radius: 30px;
  margin-right: 400x;
  margin-left: 0%;
`;

const Footer = () => {
  return <StyledFooter></StyledFooter>;
};

export default Footer;
