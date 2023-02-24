import { Restangle } from "Assets";
import { useEffect, useMemo, useState } from "react";
import { createBoard } from "Services/board";
import { ICreateBoardDto } from "Dtos/boardDtos";
import { Links } from "Routes/links";
import { CustomModal } from "Components/shared/modal";
import { createBoardValidation } from "Helper/validations";
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
import { useActionCreators, useAppSelector } from "Store/hooks";
import { fetchBoards, boardActions } from "Store/slices/boardSlice";

import { Status } from "Helper/enums";
import Loading from "Components/shared/loading";
import { Button } from "Components/shared/button";
import { toast } from "react-toastify";
import { getUserToken } from "Helper/getToken";

const allActionsBoard = {
  ...boardActions,
  fetchBoards,
};
export const SideBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [createBoardObject, setCreateBoardObject] = useState<{
    isLoading?: boolean;
    error?: string;
  }>({
    error: "",
    isLoading: false,
  });
  const { board, status } = useAppSelector((state) => state.boards);
  const actions = useActionCreators(allActionsBoard);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreateBoard = async (values: ICreateBoardDto) => {
    setCreateBoardObject({ isLoading: true });
    const { status, data } = await createBoard(values);
    if (status === 200) {
      toast.success("board elave olundu");
      actions.fetchBoards();
      setOpenModal(false);
      setCreateBoardObject({ isLoading: false });
    } else if (status === 400) {
      setCreateBoardObject({ error: data });
    }
  };

  useEffect(() => {
    if (getUserToken()) {
      actions.fetchBoards();
    }
  }, []);

  const config: Partial<ConfigProps> = useMemo(() => {
    return {
      description: {
        item: {
          hidden: true,
        },
      },

      arrayField: {
        renderColumns: true,
        isActive: true,
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

  const renderContent = () => {
    if (status === Status.loading) {
      return <Loading />;
    }
    return (
      <>
        <Title>ALL BOARDS ({board.length})</Title>
        <List>
          {board?.map((item) => (
            <StyledLink key={item.id} to={`${Links.app.home}/${item.id}`}>
              <StyledButton>{item.title}</StyledButton>
            </StyledLink>
          ))}
        </List>
        <StyledButton onClick={handleOpenModal}>
          + Create New Board
        </StyledButton>
        <CustomModal handleCloseModal={handleCloseModal} openModal={openModal}>
          <div>{createBoardObject?.error}</div>
          <CustomForm
            renderButton={
              <Button
                loading={createBoardObject.isLoading}
                fullWidth
                text="add board"
                type="submit"
              />
            }
            initialValue={{
              title: "",
              columns: [],
            }}
            onSubmit={handleCreateBoard}
            config={config}
            onValidationSchema={createBoardValidation()}
          />
        </CustomModal>
      </>
    );
  };
  return (
    <Wrapper>
      <Content>
        <Icons>
          <Restangle />
          <StyledRestangle2 />
          <StyledRestangle3 />
          <Text>Kanban</Text>
        </Icons>
        <Boards>{renderContent()}</Boards>
      </Content>
    </Wrapper>
  );
};
