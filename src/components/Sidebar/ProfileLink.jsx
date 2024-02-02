import { Tooltip, Flex, Box, Avatar, Link } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import { Link as routerLink } from "react-router-dom";
const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);
  return (
    <Tooltip
      label="Profile"
      hasArrow
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        as={routerLink}
        to={`/${authUser?.userName}`}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Avatar size={"xs"} src={authUser?.profilePicURL || ""} />{" "}
        <Box display={{ base: "none", md: "block" }}>Profile</Box>
      </Link>
    </Tooltip>
  );
};

export default ProfileLink;
