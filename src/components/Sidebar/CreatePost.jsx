import {
  Tooltip,
  Flex,
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Textarea,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
  Image,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import usePreviewImg from "../../hooks/usePreviewImg";
// import { BsFillImageFill } from "react-icons/bs";
import { CreatePostLogo } from "../../assets/constants";
import { useRef, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [flag, setFlag] = useState(false);
  const [caption, setCaption] = useState("");
  const imgRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();

  const { isLoading, handleCreatePost } = useCreatePost();
  const showToast = useShowToast();
  const handlePostCreation = async () => {
    if (isLoading) return;
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        label="Create Post"
        hasArrow
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              type="file"
              hidden
              ref={imgRef}
              onChange={handleImageChange}
            />
            <Flex flexDir={{ base: "column", sm: "row" }} gap={2}>
              <Button
                style={{
                  marginTop: "15px",
                  // marginLeft: "5px",
                  cursor: "pointer",
                  color: "black",
                  background: "white",
                }}
                // size={16}
                w={"full"}
                size={"sm"}
                onClick={() => {
                  imgRef.current.click();
                  setFlag(false);
                }}
              >
                Picture
              </Button>
              <Button
                style={{
                  marginTop: "15px",
                  // marginLeft: "5px",
                  cursor: "pointer",
                  color: "black",
                  background: "white",
                }}
                // size={16}
                w={"full"}
                size={"sm"}
                onClick={() => setFlag(true)}
              >
                Strings
              </Button>
            </Flex>
            {flag && (
              <Text
                fontSize={14}
                m={4}
                w={"full"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                Available Soon
              </Text>
            )}
            {selectedFile && (
              <Flex
                mt={2}
                mb={2}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
                direction={"column"}
              >
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  // alignItems={"center"}
                  // w={"full"}
                  // justifyContent={"flex-end"}
                  onClick={() => setSelectedFile(null)}
                />
                <Image src={selectedFile} alt="Selected img" />
              </Flex>
            )}
            {!flag && (
              <Textarea
                mt={2}
                placeholder="Post caption..."
                _placeholder={{ color: "gray.300" }}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={100}
              />
            )}
          </ModalBody>

          <ModalFooter>
            {!flag && (
              <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
                Post
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}

export default CreatePost;
