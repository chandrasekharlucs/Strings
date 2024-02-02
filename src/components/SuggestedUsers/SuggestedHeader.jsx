import { Flex, Avatar, Button, Text } from "@chakra-ui/react";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogOut();
  const authUser = useAuthStore((state) => state.user);
  if (!authUser) return null;
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Flex gap={2} alignItems={"center"}>
        <Link to={`${authUser.userName}`}>
          <Avatar
            src={authUser.profilePicURL}
            alt={"user profile pic"}
            size={"sm"}
          />
        </Link>
        <Link to={`${authUser.userName}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.userName}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"sm"}
        background={"white"}
        _hover={{ background: "#FF3269", color: "white" }}
        fontWeight={"medium"}
        fontSize={14}
        color={"black"}
        cursor={"pointer"}
        isLoading={isLoggingOut}
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
