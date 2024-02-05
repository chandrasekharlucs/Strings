import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Firebase";
import useShowToast from "../../hooks/useShowToast";
import { isEmpty } from "lodash";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mail, setMail] = useState("");
  const [flag, setFlag] = useState(false);
  const showToast = useShowToast();
  const callBack = (val) => {
    setMail(val);
  };
  const actionCodeSettings = {
    url: "https://connectstrings.vercel.app/auth",
  };
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const forgotPassword = async () => {
    setFlag(true);
    try {
      const success = await sendPasswordResetEmail(mail, actionCodeSettings);
      if (success) {
        showToast("Success", "Sent email", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  if (error && flag) {
    setFlag(false);
    showToast("Error", error.message, "error");
  }

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image
            src="/logos1.png"
            w={20}
            cursor={"pointer"}
            alt="strings"
            m={"-10px"}
          />

          {isLogin ? <Login callBack={callBack} /> : <Signup />}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={1}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
          <GoogleAuth isLogin={isLogin} />
          {isLogin && (
            <Button
              isLoading={sending}
              onClick={forgotPassword}
              bg={"transparent"}
              _hover={{ background: "transparent" }}
            >
              forgot password?
            </Button>
          )}
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
