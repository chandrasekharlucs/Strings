import { Flex, VStack, Avatar, Text, Button } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, search, searchbar }) => {
  const { handleFollowerUser, isFollowing } = useFollowUser(user?.uid);
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Flex alignContent={"center"} gap={2}>
        <Link to={`${user.userName}`} onClick={searchbar}>
          <Avatar
            src={user.profilePicURL}
            alt={"user profile pic"}
            size={"sm"}
          />
        </Link>
        <VStack spacing={1} alignItems={"flex-start"}>
          <Link to={`${user.userName}`} onClick={searchbar}>
            <Text
              fontSize={10}
              fontWeight={"bold"}
              alignItems={"center"}
              alignSelf={"start"}
            >
              {user.userName}
            </Text>
          </Link>
          <Text fontSize={8} fontWeight={"bold"} color={"gray.500"}>
            {user?.followers?.length} followers
          </Text>
        </VStack>
      </Flex>
      {!search && (
        <Button
          cursor={"pointer"}
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"#FF3269"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowerUser}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
