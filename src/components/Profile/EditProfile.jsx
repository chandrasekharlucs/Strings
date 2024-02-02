import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Flex,
  Stack,
  Heading,
  Avatar,
  Button,
  Center,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useeditProfile from "../../hooks/useeditProfile";
import useShowToast from "../../hooks/useShowToast";

const initData = {
  fullName: "",
  userName: "",
  bio: "",
  profilePicURL: "",
};
const EditProfile = ({ isOpen, onClose, userData }) => {
  const [inputs, setInputs] = useState(initData);
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const { editProfile, isUpdating } = useeditProfile();
  const showToast = useShowToast();
  useEffect(() => {
    setInputs(() => ({
      fullName: userData.fullName,
      userName: userData.userName,
      bio: userData.bio,
      profilePicURL: userData.profilePicURL,
    }));
  }, [userData]);
  useEffect(() => {
    if (selectedFile !== null) {
      setInputs((prev) => ({
        ...prev,
        profilePicURL: selectedFile,
      }));
    }
  }, [selectedFile]);

  function handleChange(e, name) {
    setInputs((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          boxShadow={"xl"}
          border={"1px solid gray"}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Flex bg={"black"}>
              <Stack
                spacing={2}
                w={"full"}
                maxW={"md"}
                bg={"black"}
                rounded={"xl"}
                boxShadow={"lg"}
                p={3}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
                  Edit Profile
                </Heading>
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar size="xl" src={inputs.profilePicURL} />
                  </Center>
                  <Center w="full" flexDirection={"column"} gap={2}>
                    <Button
                      w="full"
                      //   size={"sm"}
                      onClick={() => fileRef.current.click()}
                    >
                      Edit picture
                    </Button>
                    {/* <Button w="full" size={"sm"} >
                      Remove picture
                    </Button> */}
                  </Center>
                  <Input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                </Stack>
                <Input
                  placeholder="User Name"
                  _placeholder={{ color: "white" }}
                  type="text"
                  value={inputs.userName}
                  onChange={(e) => handleChange(e, "userName")}
                />
                <Input
                  placeholder="Full Name"
                  _placeholder={{ color: "white" }}
                  type="text"
                  value={inputs.fullName}
                  onChange={(e) => handleChange(e, "fullName")}
                />
                <Input
                  placeholder="Bio"
                  _placeholder={{ color: "white" }}
                  type="text"
                  value={inputs.bio}
                  onChange={(e) => handleChange(e, "bio")}
                />
                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"white"}
                    color={"black"}
                    w="full"
                    _hover={{
                      bg: "#FF3269",
                      color: "white",
                    }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
