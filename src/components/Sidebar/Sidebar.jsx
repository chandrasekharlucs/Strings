import { Box, Button, Flex, Image, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";
import SidebarItems from "./sidebarItems";

function Sidebar() {
  const { handleLogout, isLoggingOut } = useLogOut();

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} w="full" gap={10} height={"full"}>
        <Link
          to="/"
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <Image src="/logos1.png" alt="logo" w={40} />
          {/* <InstagramLogo/> */}
        </Link>
        <Link
          to="/"
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={10}
        >
          {/* <InstagramMobileLogo /> */}
          <Image src="/light.png" alt="logo" w={20} />
        </Link>
        <Flex direction={"column"} gap={3} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        <Tooltip
          label={"Logout"}
          hasArrow
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Link
            onClick={handleLogout}
            display={"flex"}
            alignItems={"center"}
            to={"/auth"}
            as={RouterLink}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            mt={"auto"}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size="25" />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
            >
              Log Out
            </Button>
          </Link>
        </Tooltip>
      </Flex>
    </Box>
  );
}

export default Sidebar;
