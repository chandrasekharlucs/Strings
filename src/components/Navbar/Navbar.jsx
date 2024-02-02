import { Button, Container, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex
        alignItems={"center"}
        justifyContent={{ base: "center", sm: "space-between" }}
        w={"full"}
      >
        <Image
          h={10}
          display={{ base: "none", sm: "block" }}
          cursor={"pointer"}
          src="/logos1.png"
          alt="logo"
        />
        <Flex gap={4}>
          <Link to={"auth"}>
            <Button
              //   colorScheme="gray"
              variant={"filled"}
              size={"sm"}
              _hover={{ bg: "#FF3269", color: "white" }}
            >
              Login
            </Button>
          </Link>
          <Link to={"auth"}>
            <Button variant={"outline"} size={"sm"}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
