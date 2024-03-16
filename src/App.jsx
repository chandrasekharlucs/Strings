import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import useAuthStore from "./store/authStore";
import { auth } from "./Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log(
      "%cHi,Welcome to Strings.",
      "font-size:40px; font-weight:bold; color:red;"
    );
  }, []);
  // const authUser = useAuthStore((state) => state.user);
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:userName" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
