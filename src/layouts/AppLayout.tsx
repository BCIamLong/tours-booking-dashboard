import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  grid-template-rows: auto 1fr;
  height: 94vh;
`;

const StyledAppLayoutWrap = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  padding: 4.8rem 6rem;
  background-color: var(--color-grey-50);
  /* position: relative; */
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 128rem;
  margin: 0 auto;
`;

const StyledBar = styled.div`
  display: flex;
  padding: 0.6rem 0.3rem;
  background-color: #e7e555c7;
  justify-content: center;
`;

const StyledLink = styled.a`
  color: #0b82d1;
  text-transform: uppercase;
  margin-left: 0.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayoutWrap>
      <StyledBar>
        <span>Please wait for a minute for server spinning up, if you want you can see the demo video </span>
        <span>
          <StyledLink href="https://www.youtube.com/watch?v=ZkFJMGxUw1s" target="_blank">
            here
          </StyledLink>
        </span>
      </StyledBar>
      <StyledAppLayout>
        {/* <h1>App Layout</h1> */}
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </StyledAppLayoutWrap>
  );
}

export default AppLayout;
