import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import useShowToast from "../../hooks/useShowToast";
export default function AuthPage() {
  const showToast = useShowToast();
  return (
    <Flex
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      px={4}
      overflowY={"auto"}
      margin={5}
    >
      <Container maxW={"container.md"} padding={0}>
        <Flex alignItems={"center"} justifyContent={"center"} gap={10}>
          {/* <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={550} alt="phone img" />
          </Box> */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the App.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image
                src="/playstore.png"
                h="10"
                alt="playstore logo"
                onClick={() => showToast("Error", "Coming soon", "error")}
              />
              <Image
                src="/microsoft.png"
                h="10"
                alt="microsoft logo"
                onClick={() => showToast("Error", "Coming soon", "error")}
              />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}
