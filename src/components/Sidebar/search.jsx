import {
  Tooltip,
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import { SearchIcon } from "@chakra-ui/icons";
import UseSpinner from "../../hooks/useSpinner";
import useAuthStore from "../../store/authStore";

const Search = () => {
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, getUserProfile, user, setUser } = useSearchUser();
  const searchRef = useRef(null);
  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value, authUser);
  };
  function Close() {
    onClose();
    setUser([]);
  }

  return (
    <>
      <Tooltip
        label="Search"
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
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <form>
              <FormControl>
                <FormLabel>Username</FormLabel>
              </FormControl>
              <InputGroup>
                <Input
                  placeholder="user name"
                  ref={searchRef}
                  onChange={handleSearchUser}
                />
                <InputRightElement>
                  {isLoading ? (
                    <UseSpinner color={"gray.300"} size={"xs"} />
                  ) : (
                    <SearchIcon color="gray.300" />
                  )}
                </InputRightElement>
              </InputGroup>
              {/* <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex> */}
              <Flex my={2} gap={4} flexDir={"column"}>
                {user.map((doc) => (
                  <SuggestedUser
                    key={doc.id}
                    user={doc}
                    search="true"
                    searchbar={Close}
                  />
                ))}
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
