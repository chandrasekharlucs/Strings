import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);
  const showToast = useShowToast();
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { setUserProfile } = useUserProfileStore();
  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      //   if (authUser.following.length === 0) {
      //     setIsLoading(false);
      //     setPosts([]);
      //     return;
      //   }
      let q = [];
      if (authUser.following.length > 0) {
        q = query(
          collection(firestore, "posts"),
          where("createdBy", "in", authUser.following)
        );
        setIsSuggested(false);
      } else {
        q = query(
          collection(firestore, "posts"),
          where("createdBy", "!=", authUser.uid)
        );
        setIsSuggested(true);
      }
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);
  return { isLoading, posts, isSuggested };
};

export default useGetFeedPosts;
