import { useQuery } from "@tanstack/react-query";
import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";

function HomePage() {
  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["posts-list"],
    queryFn: getAllPosts,
  });
  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  const style = { display: "flex" };
  return (
    <>
      {categoryLoading || postLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
