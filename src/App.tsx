import { Provider } from "react-redux";
import { store } from "Store/store";
import styled from "styled-components";
import Theme from "Theme";
import { AppRoutes } from "./Routes/routes";

export const Wrapper = styled.div``;
function App() {
  return (
    <Provider store={store}>
      <Theme>
        <AppRoutes />
      </Theme>
    </Provider>
  );
}

export default App;
