import { Grid } from "@mui/material";
import { CustomForm } from "Components/shared/form";
import { CustomModal } from "Components/shared/modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postColumn } from "Services/coulmn";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { fetchColumns } from "Store/slices/columnSlice";
import { Column } from "./components/column";
import { ColumnForm } from "./components/column/components/form";
import { EmptyBoard } from "./components/emptyBoard";
import { Wrapper, Content, StyledButton, WrapperButton } from "./styled";

const Home = () => {
  const { id } = useParams<{ id: string }>();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { column } = useAppSelector((state) => state.columns);

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
      dispatch(fetchColumns(id));
    }
  }, [id]);
  return (
    <Wrapper>
      {column?.length === 0 ? (
        <Content>
          <EmptyBoard />
        </Content>
      ) : (
        <Grid container spacing={3}>
          {column?.map((x) => (
            <Column key={x.id} column={x} />
          ))}
          <Grid item>
            <WrapperButton onClick={() => setOpenModal(true)}>
              <StyledButton>+ Add New Column</StyledButton>
            </WrapperButton>
          </Grid>
        </Grid>
      )}
      <CustomModal
        handleCloseModal={() => setOpenModal(false)}
        openModal={openModal}
      >
        <CustomForm
          initialValue={{
            title: "",
          }}
          onSubmit={(values) => {
            fetchCreateColumn(values);
          }}
          config={{
            description: {
              item: {
                hidden: true,
              },
            },
            status: {
              element: {
                hidden: true,
              },
            },
            arrayField: {
              isActive: false,
            },
          }}
        />
      </CustomModal>
      {/* <ColumnForm
        fetchCreateColumn={fetchCreateColumn}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      /> */}
    </Wrapper>
  );
};
export default Home;
