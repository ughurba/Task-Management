import { Restangle } from "Assets";
import { useEffect, useMemo, useState } from "react";
import { createBoard, getAllBoard } from "Services/board";
import { ICreateBoardDto, IGetAllBoardDto } from "Dtos/boardDtos";
import { Links } from "Routes/links";
import { CustomModal } from "Components/shared/modal";
import { FieldArray, Form, Formik } from "formik";
import { Flex } from "Components/shared/flex";
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
import { Field } from "Components/shared/field";
import { ConfigProps, CustomForm } from "Components/shared/form";

export const SideBar = () => {
  const [boards, setBoards] = useState<IGetAllBoardDto[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchGetBoards = async () => {
    const { data } = await getAllBoard();
    setBoards(data);
  };
  const fetchCreateBoard = async (values: ICreateBoardDto) => {
    const { status } = await createBoard(values);
    if (status === 200) {
      fetchGetBoards();
      setOpenModal(false);
    }
  };
  const handleSubmit = (values: any) => {
    fetchCreateBoard(values);
  };
  useEffect(() => {
    fetchGetBoards();
  }, []);

  const initialValue = useMemo(
    () => ({
      title: "",
      columns: [],
    }),
    []
  );
  const config: Partial<ConfigProps> = useMemo(() => {
    return {
      description: {
        item: {
          hidden: true,
        },
      },

      arrayField: {
        renderColumns: true,
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
            {boards.map((item) => (
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
              initialValue={initialValue}
              onSubmit={handleSubmit}
              config={config}
            />
          </CustomModal>
        </Boards>
      </Content>
    </Wrapper>
  );
};
