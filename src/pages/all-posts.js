import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import PostCard from "@/frontend/components/PostCard";

export default function AllPosts( isLoggedIn ) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) router.push("/"); 
}, [isLoggedIn]);

  useEffect(() => {
    const fetchPosts = async () => {
      const db = getFirestore();
      const postsCollection = collection(db, "posts");

      try {
        const querySnapshot = await getDocs(postsCollection);
        const postsData = [];

        querySnapshot.forEach((doc) => {
          postsData.push({ id: doc.id, ...doc.data() });
        });

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}