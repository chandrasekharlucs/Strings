import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const showToast = useShowToast();
  const getUserProfile = async (userName, authUser) => {
    setIsLoading(true);
    try {
      if (userName) {
        const q = query(
          collection(firestore, "users"),
          where("userName", ">=", userName),
          where("userName", "<=", userName + "\uf8ff"),
          where("userName", "!=", authUser.userName)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setUser([]);
          return showToast("Error", "User Not Found", "error");
        }

        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUser(newData);
      } else {
        setUser([]);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
