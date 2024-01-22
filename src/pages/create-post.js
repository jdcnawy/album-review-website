import { React, useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import CreatePostForm from "@/frontend/components/CreatePostForm";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';

export default function CreatePost({ isLoggedIn, userInformation }) {
  const router = useRouter();
  const { albumId } = router.query;
  const [albumInfo, setAlbumInfo] = useState(null);
  const [formData, setFormData] = useState({
    albumTitle: "",
    artist: "",
    review: "",
    image: "", // Add the 'image' property to store the image URL
  });
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");

  useEffect(() => {
        
    if (!isLoggedIn)  router.push("/login");
},[isLoggedIn]);

  const getAlbumCoverUrl = (albumInfo) => {
    const images = albumInfo.images || [];
    const coverUrl = images[0]?.url || "";
    return coverUrl;
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let albumInfoFromQuery = router.query.albumInfo
          ? JSON.parse(router.query.albumInfo)
          : null;

        console.log("Album Info Fetched:", albumInfoFromQuery);

        if (!albumInfoFromQuery || !albumInfoFromQuery.images) {
          albumInfoFromQuery = await fetchAlbumInfoById(albumId);
        }

        console.log("Album Info Updated:", albumInfoFromQuery);
        setAlbumInfo(albumInfoFromQuery);

        if (albumInfoFromQuery && Object.keys(albumInfoFromQuery).length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            albumTitle: albumInfoFromQuery.name || "",
            artist: albumInfoFromQuery.artists[0]?.name || "",
          }));

          if (albumInfoFromQuery.images && albumInfoFromQuery.images.length > 0) {
            const coverUrl = albumInfoFromQuery.images[0].url;
            console.log("Album Cover URL:", coverUrl);
            setAlbumCoverUrl(coverUrl);

            // Automatically set the downloaded image to the 'image' property
            setFormData((prevData) => ({
              ...prevData,
              image: coverUrl,
            }));
          } else if (
            albumInfoFromQuery.album.images &&
            albumInfoFromQuery.album.images.length > 0
          ) {
            const coverUrl = albumInfoFromQuery.album.images[0].url;
            console.log("Album Cover URL:", coverUrl);
            setAlbumCoverUrl(coverUrl);

            // Automatically set the downloaded image to the 'image' property
            setFormData((prevData) => ({
              ...prevData,
              image: coverUrl,
            }));
          } else {
            console.warn("Images property not found in albumInfo.");
          }
        } else {
          console.warn("Album Info is empty or undefined.");
        }
      } catch (error) {
        console.error("Error fetching albumInfo:", error);
      }
    };

    fetchData();
  }, [albumId, router.query.albumInfo]);

  const createPostFunction = useCallback(
    async (e, imageUpload) => {
      e.preventDefault();

      const storage = getStorage();
      const db = getFirestore();
      const { albumTitle, artist, review, } = formData; // Include the 'image' property
      let image = ""

      // Rest of the code remains unchanged
      const storageRef = ref(storage, imageUpload?.name);

      await uploadBytes(storageRef, imageUpload)
        .then(async (snapshot) => {
          await getDownloadURL(snapshot.ref).then((url) => {
            image = url; // Assign the URL to 'image' property
          });
        })
        .catch((error) => {
          console.warn(error);
        });

      const data = await addDoc(collection(db, "posts"), {
        albumTitle,
        artist,
        review,
        userId: userInformation.uid,
        imageURL: image, // Use the 'image' property instead of imageURL
      });

      if (data) {
        router.push("/");
      }
    },
    [addDoc, collection, getFirestore, userInformation, router, formData]
  );

  const fetchAlbumInfoById = async (albumId) => {
    try {
      const response = await axios.get(`http://localhost:3001/getAlbumInfo/${albumId}`);
      let albumInfo = response.data;

      if (!albumInfo.images || albumInfo.images.length === 0) {
        albumInfo.images = [];
      }

      return albumInfo;
    } catch (error) {
      console.error("Error fetching albumInfo by id:", error);
      throw error;
    }
  };

  const getDownloadLinkFunction = async (imageUrl) => {
    try {
      const response = await axios.post('http://localhost:3001/getDownloadLink', { imageUrl });
      return response.data;
    } catch (error) {
      console.error('Error getting download link:', error);
      throw error;
    }
  };
  
  
  return (
    <>
      <main>
        <CreatePostForm
          createPostFunction={createPostFunction}
          formData={formData}
          setFormData={setFormData}
          albumCoverUrl={albumCoverUrl}
          getDownloadLinkFunction={getDownloadLinkFunction}
        />
      </main>
    </>
  );
}
