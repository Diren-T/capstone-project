import Link from "next/link";
import styled from "styled-components";

const StyledNavbar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 60px;
  position: fixed;
  bottom: 20px;
  background: lightgray;
`;

const StyledLink = styled(Link)`
  justify-content: space-evenly;
  display: flex;
  align-items: flex-end
  margin-right: 10px;
`;

export default function Navbar() {
  return (
    <>
      <StyledNavbar>
        <Link href="/">
          <svg
            width="60"
            height="60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.6446 63.3433V59.0368L30.2264 54.7303V38.9396L6.50366 46.1172V40.3751L30.2264 26.02V10.2293C30.2264 9.03304 30.6338 8.0167 31.4488 7.18027C32.2619 6.34193 33.2499 5.92276 34.4127 5.92276C35.5756 5.92276 36.5636 6.34193 37.3767 7.18027C38.1916 8.0167 38.5991 9.03304 38.5991 10.2293V26.02L62.3218 40.3751V46.1172L38.5991 38.9396V54.7303L44.1809 59.0368V63.3433L34.4127 60.4723L24.6446 63.3433Z"
              fill="#1C1B1F"
            />
          </svg>
        </Link>
        <Link href="/dashboard">
          <svg
            width="60"
            height="60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5589 58.7469C11.4426 58.7469 10.4657 58.3283 9.62847 57.491C8.79119 56.6537 8.37256 55.6769 8.37256 54.5605V12.6969C8.37256 11.5806 8.79119 10.6037 9.62847 9.76647C10.4657 8.9292 11.4426 8.51056 12.5589 8.51056H54.4225C55.5389 8.51056 56.5157 8.9292 57.353 9.76647C58.1903 10.6037 58.6089 11.5806 58.6089 12.6969V54.5605C58.6089 55.6769 58.1903 56.6537 57.353 57.491C56.5157 58.3283 55.5389 58.7469 54.4225 58.7469H12.5589ZM12.5589 54.5605H31.3975V12.6969H12.5589V54.5605ZM35.5839 54.5605H54.4225V33.559H35.5839V54.5605ZM35.5839 29.3726H54.4225V12.6969H35.5839V29.3726Z"
              fill="#1C1B1F"
            />
          </svg>
        </Link>
      </StyledNavbar>
    </>
  );
}
