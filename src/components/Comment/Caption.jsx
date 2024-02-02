import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TimeAgo } from "../../utils/TimeAgo";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({ post }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  return (
    <Flex gap={4} marginTop={2}>
      <Link to={`/${userProfile?.userName}`}>
        <Avatar src={userProfile?.profilePicURL} size={"sm"} />
      </Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Link to={`/${userProfile?.userName}`}>
            <Text fontWeight="bold" fontSize={12}>
              {userProfile?.userName}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption} </Text>
        </Flex>
        {/* <Text fontSize={12} color={"gray"}>
          {TimeAgo(post.createdAt)}
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default Caption;
