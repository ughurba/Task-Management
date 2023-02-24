import { Grid } from "@mui/material";
import { Button } from "Components/shared/button";
import { CustomForm } from "Components/shared/form";
import Loading from "Components/shared/loading";
import { CustomModal } from "Components/shared/modal";
import { Status } from "Helper/enums";
import { getTask } from "Helper/getTask";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postColumn } from "Services/coulmn";
import { useActionCreators, useAppSelector } from "Store/hooks";
import { fetchColumns } from "Store/slices/columnSlice";
import { ITask } from "types";
import { Column } from "./components/column";
import { EmptyBoard } from "./components/emptyBoard";
import { TaskModal } from "./components/taskModal";
import { Wrapper, Content, StyledButton, WrapperButton } from "./styled";
import { columnActions } from "Store/slices/columnSlice";

const allColumnActions = {
  ...columnActions,
  fetchColumns,
};
const Home = () => {
  const { id } = useParams<{ id: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [task, setTask] = useState<ITask>();
  const columnActions = useActionCreators(allColumnActions);

  const { column, status } = useAppSelector((state) => state.columns);

  const fetchCreateColumn = async (values: { title: string }) => {
    const { status } = await postColumn({
      boardId: id as string,
      title: values.title,
    });
    if (status === 200) {
      if (id) {
        columnActions.fetchColumns(id);
        setOpenModal(false);
      }
    }
  };

  const handleClickTask = (taskId: number) => {
    setTask(getTask(column, taskId));
    setOpenTaskModal(true);
  };
  useEffect(() => {
    if (id) {
      columnActions.fetchColumns(id);
    }
  }, [id]);

  return (
    <Wrapper>
      {status === Status.loading ? (
        <Loading />
      ) : (
        <>
          {column?.length === 0 ? (
            <Content>
              <EmptyBoard />
            </Content>
          ) : (
            <Grid container spacing={3}>
              {column?.map((x) => (
                <Column onClick={handleClickTask} key={x.id} column={x} />
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
              renderButton={
                <Button fullWidth text="add column" type="submit" />
              }
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
          {openTaskModal && (
            <TaskModal
              task={task as ITask}
              handleCloseModal={() => setOpenTaskModal(false)}
              openModal={openTaskModal}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};
export default Home;
