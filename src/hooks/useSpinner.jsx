import { Flex, Spinner } from "@chakra-ui/react";
const UseSpinner = ({ size, color }) => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      color={color || "white"}
    >
      <Spinner size={size} />
    </Flex>
  );
};

export default UseSpinner;
