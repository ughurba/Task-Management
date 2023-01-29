import { Grid } from "@mui/material";
import { IGetColumnsDto } from "Dtos/columnDtos";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getColumns, postColumn } from "Services/coulmn";
import styled from "styled-components";
import { Column } from "./components/column";
import { ColumnForm } from "./components/column/components/form";
import { EmptyBoard } from "./components/emptyBoard";

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
  const [columns, setColumns] = useState<IGetColumnsDto[]>();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchColumns = async (id: string) => {
    const { data } = await getColumns(id);
    setColumns(data);
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
      <Content>{columns?.length === 0 && <EmptyBoard />}</Content>
      <Grid container>
        {columns?.map((x) => (
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
