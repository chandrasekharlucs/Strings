import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { TimeAgo } from "../../utils/TimeAgo";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ post, creatorProfile }) => {
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollowerUser } = useFollowUser(
    post.createdBy
  );
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"full"}
      my={2}
    >
      <Flex alignContent={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.userName}`}>
            <Avatar
              src={creatorProfile.profilePicURL}
              alt={"user profile pic"}
              size={"sm"}
            />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}
        <Flex fontSize={12} fontWeight={"bold"} gap={2} alignItems={"center"}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.userName}`}>
              {creatorProfile.userName}
            </Link>
          ) : (
            <Skeleton w={"100px"} h={"10px"} />
          )}
          <Box color={"gray.500"}>• {TimeAgo(post.createdAt)} </Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12}
          fontWeight={"bold"}
          color={"#FF3269"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowerUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
