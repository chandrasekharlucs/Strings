import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

function FeedPosts() {
  const { isLoading, posts, isSuggested } = useGetFeedPosts();
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack
                gap={2}
                alignItems={"flex-start"}
                justifyContent={"center"}
              >
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>Contents Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && posts.length === 0 && (
        <Text
          fontSize={"md"}
          fontWeight={"bold"}
          w={"full"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"80vh"}
        >
          No Suggested and Feed Posts
        </Text>
      )}
      {!isLoading && posts.length > 0 && isSuggested && (
        <>
          <Text fontSize={16} fontWeight={"bold"} marginBottom={4}>
            Suggested Posts
          </Text>
        </>
      )}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => (
          <FeedPost key={post.id} post={post} isSuggested={isSuggested} />
        ))}
    </Container>
  );
}

export default FeedPosts;
