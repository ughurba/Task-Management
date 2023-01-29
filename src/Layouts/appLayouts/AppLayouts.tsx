import { SideBar } from "Components/layout/sideBar";
import { Flex } from "Components/shared/flex";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../Components/layout/header";

export const Main = styled.div`
  width: 100%;
  margin-left: 3px;
  height: 100vh;
`;
export const ImplementFlex = styled(Flex)``;

export const AppLayout = () => {
  return (
    <>
      <ImplementFlex>
        <SideBar />
        <Main>
          <Header />
          <Outlet />
        </Main>
      </ImplementFlex>
    </>
  );
};
