import { Button } from "Components/shared/button";
import { Flex } from "Components/shared/flex";
import { useSetUser } from "Hooks/useSetUser";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Links } from "Routes/links";
import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled as MuiStyled } from "@mui/material";
import { CustomModal } from "Components/shared/modal";
import { CustomForm, ConfigProps } from "Components/shared/form";
import { Field, FieldArray } from "formik";

export const Wrapper = styled.div``;
export const StyledHeader = styled.header``;
export const Text = styled.p``;
export const Title = styled.h2``;
export const StyledToolbar = MuiStyled(Toolbar)`
justify-content:space-between;
background:white;
color:black;
`;
export const Header = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useSetUser();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate(Links.auth.login);
    }
  }, []);

  const initialValue = useMemo(
    () => ({
      title: "",
      description: "",
      status: 0,
      subTasks: [],
    }),
    []
  );
  const handleSubmit = (values: typeof initialValue) => {
    console.log(values);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Title>Platform Launch</Title>
          <Flex AlItems="center">
            <Button onClick={handleOpenModal} text="+Add New Task" />
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </Flex>
        </StyledToolbar>
      </AppBar>
      <CustomModal handleCloseModal={handleCloseModal} openModal={openModal}>
        <CustomForm initialValue={initialValue} onSubmit={handleSubmit} />
      </CustomModal>
    </Box>
  );
};
