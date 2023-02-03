import { MenuItem, TextField } from "@mui/material";

import { FieldArray, FormikProps, FormikValues } from "formik";
import { FC } from "react";
import { useAppSelector } from "Store/hooks";
import { DynamicCard } from "../dynamicCard";
import { Field } from "../field";
import { Flex } from "../flex";

interface ItemShape {
  item?: Record<string, any>;
  element?: Record<string, any>;
}
interface ArrayFieldProps {
  renderColumns: boolean;
  isActive: boolean;
}
export interface ConfigProps {
  formik: ItemShape;
  title: ItemShape;
  description: ItemShape;
  arrayField: Partial<ArrayFieldProps>;
  status: ItemShape;
  render: JSX.Element[];
}

interface Props {
  initialValue: Record<string, any>;
  onSubmit: (values: any) => void;
  config?: Partial<ConfigProps>;
}

export const CustomForm: FC<Props> = ({
  initialValue,
  onSubmit,
  config = {
    arrayField: {
      isActive: true,
    },
  },
}) => {
  const { column } = useAppSelector((state) => state.columns);

  return (
    <DynamicCard
      initialValue={initialValue}
      onSubmit={onSubmit}
      {...config?.formik?.item}
    >
      {(props: FormikProps<FormikValues>) => (
        <>
          <Field name={"title"} label="Title" {...config?.title?.item} />
          <Field
            name={"description"}
            label="Description"
            {...config?.description?.item}
          />
          {config?.arrayField?.isActive && (
            <>
              {config?.arrayField?.renderColumns ? (
                <div>
                  <span>Columns</span>
                  <FieldArray
                    name="columns"
                    render={(arrayHelpers) => (
                      <div>
                        {props?.values?.columns?.map((col: any, i: number) => (
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
                </div>
              ) : (
                <div>
                  <span>Subtasks</span>
                  <FieldArray
                    name="subTasks"
                    render={(arrayHelpers) => (
                      <div>
                        {props?.values?.subTasks?.map(
                          (task: any, i: number) => (
                            <Flex AlItems="center" key={i}>
                              <Field name={`subTasks[${i}]`} />
                              <button onClick={() => arrayHelpers.remove(i)}>
                                X
                              </button>
                            </Flex>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  />
                </div>
              )}
            </>
          )}

          <div {...config?.status?.element}>
            <TextField
              select
              style={{ width: "200px", marginTop: "29px" }}
              variant="outlined"
              name="columnId"
              label={"Status"}
              value={props?.values?.status}
              onChange={props?.handleChange}
            >
              {column?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item.title}
                </MenuItem>
              ))}
            </TextField>
          </div>
          {
            config?.render?.map((x, i) => (
              <div key={i}>{x}</div>
            )) as JSX.Element[]
          }
          <button type="submit">Create board</button>
        </>
      )}
    </DynamicCard>
  );
};
