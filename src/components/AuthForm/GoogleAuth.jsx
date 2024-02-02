import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore, auth } from "../../firebase/firebase";

const GoogleAuth = ({ isLogin }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        //login
        const userDoc = docSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        //sign up
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          userName: newUser.user.email.split("@")[0].toLowerCase(),
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
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
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={handleGoogleAuth}
      >
        <Image src="/google.png" w={4} alt="google" />
        <Text mx={2} color={"blue.500"}>
          {isLogin ? "Log in with Google" : "Sign up with Google"}
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
