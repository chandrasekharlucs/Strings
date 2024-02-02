import CreatePost from "./CreatePost";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./search";
import Home from "./Home";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
