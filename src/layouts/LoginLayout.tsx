import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLoginLayout = styled.div`
  /* height: 100vh; */
`;

const StyledBar = styled.div`
  display: flex;
  position: fixed;
  padding: 0.6rem 0.3rem;
  background-color: #e7e555c7;
  justify-content: center;
  width: 100%;
`;

const StyledLink = styled.a`
  color: #0b82d1;
  text-transform: uppercase;
  margin-left: 0.4rem;
`;

export default function LoginLayout() {
  return (
    <StyledLoginLayout>
      <StyledBar>
        <span>Please wait for a minute for server spinning up, if you want you can see the demo video </span>
        <span>
          <StyledLink href="https://www.youtube.com/watch?v=ZkFJMGxUw1s" target="_blank">
            here
          </StyledLink>
        </span>
      </StyledBar>
      <Outlet />
    </StyledLoginLayout>
  );
}
