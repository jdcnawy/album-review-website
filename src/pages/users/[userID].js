import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfileCard from "@/frontend/components/UserProfileCard";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import PostCard from "@/frontend/components/PostCard";
import styles from "../../frontend/components/components.module.css";

export default function UserProfile({ isLoggedIn, userInformation }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn]);

  useEffect(() => {
    async function getUserData() {
      if (userInformation?.uid) {
        const db = getFirestore();
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", userInformation?.uid)
        );

        try {
          const userSnapshot = await getDocs(userQuery);
          userSnapshot.forEach((doc) => {
            setUser(doc.data());
          });

          // Now, fetch the user's posts
          const postsQuery = query(
            collection(db, "posts"),
            where("userId", "==", userInformation?.uid)
          );
          const postsSnapshot = await getDocs(postsQuery);

          const postsArray = [];
          postsSnapshot.forEach((post) => {
            postsArray.push({ id: post.id, ...post.data() });
          });

          setUserPosts(postsArray);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }

    getUserData();
  }, [userInformation]);

  return (
    <main className={styles.UserProfileContainer}>
      <UserProfileCard user={user} userInformation={userInformation} />
      <section className={styles.Dashboard}>
        <h2>User Posts</h2>
        {userPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </main>
  );
}