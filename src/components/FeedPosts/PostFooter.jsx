import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import usePostcomment from "../../hooks/usePostcomment";
import useAuthStore from "../../store/authStore";
import Caption from "../Comment/Caption";
import { TimeAgo } from "../../utils/TimeAgo";
import useLikePost from "../../hooks/useLikePost";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostcomment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { likes, isLiked, hanldeLikePost } = useLikePost(post);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };
  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box cursor={"pointer"} onClick={hanldeLikePost} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontSize={"small"} fontWeight={600}>
        {likes} {likes > 1 ? "likes" : "like"}
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize="small" fontWeight={700}>
            {creatorProfile?.userName}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize={"small"}
              color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View {post.comments.length > 1 ? "all" : null}{" "}
              {post.comments.length}{" "}
              {post.comments.length > 1 ? "comments" : "comment"}
            </Text>
          )}
          {isOpen ? (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}
      {isProfilePage && authUser && post.caption && <Caption post={post} />}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"center"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder="Add a comment..."
              fontSize={14}
              value={comment}
              ref={commentRef}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"#FF3269"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                isLoading={isCommenting}
                onClick={handleSubmitComment}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
      <Text fontSize={12} color={"gray"}>
        Posted {TimeAgo(post.createdAt)}
      </Text>
    </Box>
  );
};

export default PostFooter;
