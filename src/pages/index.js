import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(`/users/${user.uid}`);
      } else {
        router.push("/login");
      }
    });
  }, [router]);

  return null;
}

