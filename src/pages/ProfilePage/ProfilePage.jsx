import {
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import { useParams } from "react-router-dom";
import useGetUserprofileByUsername from "../../hooks/useGetUserprofileByUsername";
import { Link as routerLink } from "react-router-dom";

const ProfilePage = () => {
  const { userName } = useParams();
  const { isLoading, userProfile } = useGetUserprofileByUsername(userName);
  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;
  return (
    <Container maxW="container.lg" py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        flexDirection={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};
const ProfileSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      alignItems={"center"}
      justifyContent={"center"}
      direction={{ base: "column", sm: "row" }}
    >
      <SkeletonCircle size={24} />
      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height={"12px"} width={"150px"} />
        <Skeleton height={"12px"} width={"150px"} />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex
      flexDir={"column"}
      // textAlign={"center"}
      h={"100vh"}
      mx={"auto"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={routerLink}
        to={"/"}
        color={"#FF3269"}
        w={"max-content"}
        mx={"auto"}
      >
        Go Home
      </Link>
    </Flex>
  );
};

export default ProfilePage;
