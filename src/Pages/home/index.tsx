import { Grid } from "@mui/material";
import { IGetColumnsDto } from "Dtos/columnDtos";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getColumns, postColumn } from "Services/coulmn";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import styled from "styled-components";
import { Column } from "./components/column";
import { ColumnForm } from "./components/column/components/form";
import { EmptyBoard } from "./components/emptyBoard";
import { columnActions } from "Store/slices/columnSlice";
export const Wrapper = styled.section`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  cursor: pointer;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledButton = styled.button`
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGrey};
  background: none;
  border: none;
`;
export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 550px;
  background: linear-gradient(
    180deg,
    #e9effa 0%,
    rgba(233, 239, 250, 0.5) 100%
  );
  border-radius: 6px;
`;
const Home = () => {
  const { id } = useParams<{ id: string }>();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { column } = useAppSelector((state) => state.coulmns);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchColumns = async (id: string) => {
    const { data } = await getColumns(id);
    dispatch(columnActions.setColumn(data));
  };

  const fetchCreateColumn = async (values: { title: string }) => {
    const { status } = await postColumn({
      boardId: id as string,
      title: values.title,
    });
    if (status === 200) {
      if (id) {
        fetchColumns(id);
        setOpenModal(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchColumns(id);
    }
  }, [id]);
  return (
    <Wrapper>
      <Content>{column?.length === 0 && <EmptyBoard />}</Content>
      <Grid container>
        {column?.map((x) => (
          <Column key={x.id} column={x} />
        ))}
        <Grid item>
          <WrapperButton onClick={handleOpenModal}>
            <StyledButton>+ Add New Column</StyledButton>
          </WrapperButton>
        </Grid>
      </Grid>
      <ColumnForm
        fetchCreateColumn={fetchCreateColumn}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </Wrapper>
  );
};
export default Home;
