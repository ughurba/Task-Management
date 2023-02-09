import styled from "styled-components";

export const Title = styled.h3`
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;

  /* Black */

  color: #000112;
`;
export const Description = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 23px;
  /* or 177% */

  /* Medium Grey */

  color: #828fa3;
  margin-top: 24px;
  margin-bottom: 24px;
`;
export const SubTasksWrapper = styled.div``;
export const Text = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;

  /* Medium Grey */

  color: #828fa3;
`;
export const SubTask = styled.p<{ check: boolean }>`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  /* Black */
  color: #000112;
  text-decoration: ${(props) => (props.check ? "line-through" : "")};
`;
export const CurrentStatus = styled.div``;
export const SubTaskContent = styled.div`
  background: #f4f7fd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: 8px;
`;
export const Label = styled.span`
  display: block;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;

  /* Medium Grey */

  color: #828fa3;
  margin-bottom: 8px;
  margin-top: 24px;
`;
