import { Box, Flex, Spinner, calc } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../FireBase/FireBase";
import Navbar from "../../components/Navbar/Navbar";
function PageLayout({ children }) {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";
  const checkUserIsAuth = !user && loading;
  if (checkUserIsAuth) return <PageLayoutspinner />;
  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "250px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {!canRenderNavbar ? null : <Navbar />}
      <Box
        flex={1}
        w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
}
export const PageLayoutspinner = () => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};

export default PageLayout;
