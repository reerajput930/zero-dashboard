import { useAuthContext } from "./useAuthContext";

export default function useLogout() {
  const { dispatch } = useAuthContext();

  const logout = () => {
      
    // ----------- login meaning -----------------
    // storing email and token in localstorage
    // updating the global state with dispatch (storing email and token in user state)

    // ----------- logout means ------------------- 
    //  removing the user detail(email and token) from localstorage
    //  changing the global user state with help of dispatch (storing null in user state)

    localStorage.removeItem("user");
    // dispatch logout action (here "user":NULL)
    dispatch({ type: "LOGOUT" });
    window.location.href = '/';
  };

  return {logout}
}
