import { Restangle } from "Assets";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchGetBoards();
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
            <Formik
              enableReinitialize
              initialValues={{
                title: "",
                columns: [],
              }}
              onSubmit={(values: ICreateBoardDto) => {
                fetchCreateBoard(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <Field name={"title"} label="Name" />
                  <span>columns</span>
                  <FieldArray
                    name="columns"
                    render={(arrayHelpers) => (
                      <div>
                        {values.columns.map((col, i) => (
                          <Flex AlItems="center" key={i}>
                            <Field name={`columns[${i}]`} />
                            <button onClick={() => arrayHelpers.remove(i)}>
                              X
                            </button>
                          </Flex>
                        ))}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add new Column
                        </button>
                      </div>
                    )}
                  />
                  <button type="submit">Create board</button>
                </Form>
              )}
            </Formik>
          </CustomModal>
        </Boards>
      </Content>
    </Wrapper>
  );
};
