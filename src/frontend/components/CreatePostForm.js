import React, { useState, useEffect } from "react";
import { Form, Button, Card, Image } from "react-bootstrap";
import styles from "../components/components.module.css";
import { saveAs } from 'file-saver';
import axios from 'axios'

const CreatePostForm = ({
  createPostFunction,
  formData,
  setFormData,
  albumCoverUrl,
  getDownloadLinkFunction,
}) => {
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    // Handle the album cover URL change and update the form data
    if (albumCoverUrl) {
      setFormData((prevData) => ({
        ...prevData,
        image: albumCoverUrl,
      }));
    }
  }, [albumCoverUrl, setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
  };

  const handleDownload = async () => {
    try {
      // Use the /downloadImage endpoint to get the image directly
      const response = await axios.get('http://localhost:3001/downloadImage', {
        params: { imageUrl: albumCoverUrl },
        responseType: 'blob',
      });

      // Save the blob as a file using FileSaver.js
      saveAs(response.data, 'temp_image.jpg');
    } catch (error) {
      console.error('Error downloading album cover:', error);
    }
  };
  return (
    <Card className={styles.CreatePostForm}>
      <Card.Body>
        <Card.Title>Write a Review!</Card.Title>
        <Form onSubmit={(e) => createPostFunction(e, imageUpload)} encType="multipart/form-data">
          <Form.Group controlId="formAlbumTitle">
            <Form.Label>Album Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter album title"
              name="albumTitle"
              value={formData.albumTitle}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formArtist">
            <Form.Label>Artist</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter artist"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formReview">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review"
              name="review"
              value={formData.review}
              onChange={handleInputChange}
            />
          </Form.Group>

          {albumCoverUrl && (
          <Card>
            <Image src={albumCoverUrl} alt="Album Cover" fluid />
            <Card.Body>
              <Button variant="primary" type="button" onClick={handleDownload}>
                Download Album Cover
              </Button>
            </Card.Body>
          </Card>
        )}
          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Publish
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatePostForm;


