import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import { useEffect, useRef, useState } from "react";
import usePostcomment from "../../hooks/usePostcomment";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const [comment, setComment] = useState("");
  const { isCommenting, handlePostComment } = usePostcomment();
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, comment);
    setComment("");
  };
  //   useEffect(() => {
  //     const scrollToBottom = () => {
  //       commentContainerRef.current.scrollTop =
  //         commentContainerRef.current.scrollHeight;
  //     };
  //     if (isOpen) {
  //       setTimeout(() => {
  //         scrollToBottom();
  //       }, 100);
  //     }
  //   }, [isOpen, post.comments.length]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"300px"}
            overflowY={"auto"}
            // ref={commentContainerRef}
          >
            {post.comments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
          </Flex>
          {/* <form style={{ marginTop: "2rem" }}> */}
          <Input
            placeholder="Comment"
            size={"sm"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Flex w={"full"} justifyContent={"flex-end"}>
            <Button
              // type="submit"
              ml={"auto"}
              size={"sm"}
              my={4}
              color={"black"}
              backgroundColor={"white"}
              _hover={{ color: "white", backgroundColor: "#FF3269" }}
              isLoading={isCommenting}
              onClick={handleSubmitComment}
            >
              Post
            </Button>
          </Flex>
          {/* </form> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
