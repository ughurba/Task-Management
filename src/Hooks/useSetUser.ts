import { useAppDispatch } from "Store/hooks";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { userActions } from "Store/slices/userSlice";
export const useSetUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      const decodedUser = jwtDecode<Record<string, string>>(userToken);
      dispatch(userActions.authUser(decodedUser));
    }
  }, []);
};
