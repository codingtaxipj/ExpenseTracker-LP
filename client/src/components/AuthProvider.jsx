import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/auth/user", {
          withCredentials: true,
        });
        console.log("res-data-" + response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [dispatch, userData.userID]);
  return <>{children}</>;
};

export default AuthProvider;
