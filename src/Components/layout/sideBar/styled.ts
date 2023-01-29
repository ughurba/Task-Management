import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Restangle2, Restangle3 } from "Assets";

export const Wrapper = styled.div`
  width: 300px;
  background: ${({ theme }) => theme.colors.white};
  height: 100vh;
`;
export const Icons = styled.div`
  display: flex;
`;
export const Boards = styled.div`
  margin-top: 54px;
`;
export const Title = styled.h5``;
export const List = styled.ul``;
export const Text = styled.h2`
  margin-left: 15px;
`;
export const StyledRestangle2 = styled(Restangle2)`
  margin-left: 3px;
`;
export const StyledRestangle3 = styled(Restangle3)`
  margin-left: 3px;
`;
export const StyledLink = styled(NavLink)`
  display: block;
  /* text-decoration: none; */
  margin-top: 14px;

  button {
    color: ${({ theme }) => theme.colors.mediumGrey};
  }
`;
export const StyledButton = styled.button`
  border: none;
  background: none;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  margin-top: 14px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainPurple};
`;
export const Content = styled.div`
  margin-left: 34px;
  margin-top: 30px;
`;
