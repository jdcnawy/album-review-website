// AlbumSearchResults.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AlbumSearchResults = ({ results, onAlbumClick }) => {
  return (
    <div>
      {results.map((album) => (
        <Card key={album.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={album.images[0]?.url} alt={album.name} />
          <Card.Body>
            <Card.Title>{album.name}</Card.Title>
            <Card.Text>{album.artists.map((artist) => artist.name).join(', ')}</Card.Text>
            <Button variant="primary" onClick={() => onAlbumClick(album.id)}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AlbumSearchResults;
