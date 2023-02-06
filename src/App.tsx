import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "Store/store";
import styled from "styled-components";
import Theme from "Theme";
import { AppRoutes } from "./Routes/routes";
import "react-toastify/dist/ReactToastify.css";

export const Wrapper = styled.div``;
function App() {
  return (
    <Provider store={store}>
      <Theme>
        <AppRoutes />
        <ToastContainer autoClose={3000} />
      </Theme>
    </Provider>
  );
}

export default App;
