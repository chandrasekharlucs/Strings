import { getDownloadURL, uploadString, ref } from "firebase/storage";
import { firestore, storage } from "../Firebase/Firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  doc,
  updateDoc,
  where,
  query,
  getDocs,
  collection,
} from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import { useState } from "react";

const useeditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilepics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);
    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilepics/${authUser.uid}`));
      }

      let updatedUser = {};
      if (authUser.userName === inputs.userName) {
        updatedUser = {
          ...authUser,
          fullName: inputs.fullName,
          //   userName: inputs.userName,
          bio: inputs.bio,
          profilePicURL: URL || authUser.profilePicURL,
        };
      } else {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("userName", "==", inputs.userName));
        const quertSnapShot = await getDocs(q);
        if (!quertSnapShot.empty) {
          showToast("Error", "Username Already Exits.", "error");
          return;
        }

        updatedUser = {
          ...authUser,
          fullName: inputs.fullName,
          userName: inputs.userName,
          bio: inputs.bio,
          profilePicURL: URL || authUser.profilePicURL,
        };
      }
      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile Updated Successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { editProfile, isUpdating };
};

export default useeditProfile;
