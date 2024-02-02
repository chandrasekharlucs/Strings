import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserprofileByUsername = (userName) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();
  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("userName", "==", userName)
        );
        const querySnapShot = await getDocs(q);
        if (querySnapShot.empty) return setUserProfile(null);
        let userDoc;
        querySnapShot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [setUserProfile, showToast, userName]);

  return { isLoading, userProfile };
};

export default useGetUserprofileByUsername;
