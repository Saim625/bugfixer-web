import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { storeloginInfo } from "@/utils/userSlice";

export const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/get-profile`, {
          withCredentials: true,
        });
        dispatch(storeloginInfo(res.data.user));
      } catch (err) {
        console.log("User not logged in:", err.message);
      }
    };
    fetchUser();
  }, [dispatch]);

  return null;
};
