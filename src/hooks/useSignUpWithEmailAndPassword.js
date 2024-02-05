import { auth, firestore } from "../Firebase/Firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs) => {
    if (
      !inputs.fullName ||
      !inputs.email ||
      !inputs.userName ||
      !inputs.password
    ) {
      showToast("Error", "Please fill all the fields.", "error");
      return;
    }

    const usersRef = collection(firestore, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("userName", "==", inputs.userName));
    const quertSnapShot = await getDocs(q);
    if (!quertSnapShot.empty) {
      showToast("Error", "Username Already Exits.", "error");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          userName: inputs.userName.toLowerCase(),
          fullName: inputs.fullName,
          email: inputs.email,
          bio: "",
          profilePicURL: "",
          following: [],
          followers: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
