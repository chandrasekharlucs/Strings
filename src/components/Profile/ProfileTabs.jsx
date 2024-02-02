import { Box, Flex, Text } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import { GoVideo } from "react-icons/go";
const ProfileTabs = () => {
  return (
    <Flex
      alignItems={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
      justifyContent={"center"}
    >
      <Flex
        borderTop={"1px solid white"}
        alignItems={"center"}
        justifyContent={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Posts
        </Text>
      </Flex>
      <Flex
        // borderTop={"1px solid white"}
        alignItems={"center"}
        justifyContent={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={28}>
          <GoVideo />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Reels
        </Text>
      </Flex>
      <Flex
        // borderTop={"1px solid white"}
        alignItems={"center"}
        justifyContent={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Saved
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileTabs;
