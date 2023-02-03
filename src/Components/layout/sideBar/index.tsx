import { Restangle } from "Assets";
import { useEffect, useMemo, useState } from "react";
import { createBoard } from "Services/board";
import { ICreateBoardDto } from "Dtos/boardDtos";
import { Links } from "Routes/links";
import { CustomModal } from "Components/shared/modal";

import {
  Wrapper,
  Boards,
  Content,
  Icons,
  List,
  StyledButton,
  StyledLink,
  StyledRestangle2,
  StyledRestangle3,
  Text,
  Title,
} from "./styled";
import { ConfigProps, CustomForm } from "Components/shared/form";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { fetchBoards } from "Store/slices/boardSlice";

export const SideBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { board } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreateBoard = async (values: ICreateBoardDto) => {
    const { status } = await createBoard(values);
    if (status === 200) {
      dispatch(fetchBoards());
      setOpenModal(false);
    }
  };

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  const config: Partial<ConfigProps> = useMemo(() => {
    return {
      description: {
        item: {
          hidden: true,
        },
      },

      arrayField: {
        // renderColumns: true,
        // isActive: true,
      },

      title: {
        item: {
          name: "title",
          label: "Name",
        },
      },
      status: {
        element: {
          hidden: true,
        },
      },
    };
  }, []);

  return (
    <Wrapper>
      <Content>
        <Icons>
          <Restangle />
          <StyledRestangle2 />
          <StyledRestangle3 />
          <Text>Kanban</Text>
        </Icons>
        <Boards>
          <Title>ALL BOARDS (3)</Title>
          <List>
            {board.map((item) => (
              <StyledLink key={item.id} to={`${Links.app.home}/${item.id}`}>
                <StyledButton>{item.title}</StyledButton>
              </StyledLink>
            ))}
          </List>
          <StyledButton onClick={handleOpenModal}>
            + Create New Board
          </StyledButton>
          <CustomModal
            handleCloseModal={handleCloseModal}
            openModal={openModal}
          >
            <CustomForm
              initialValue={{
                title: "",
                columns: [],
              }}
              onSubmit={handleCreateBoard}
              config={config}
            />
          </CustomModal>
        </Boards>
      </Content>
    </Wrapper>
  );
};
