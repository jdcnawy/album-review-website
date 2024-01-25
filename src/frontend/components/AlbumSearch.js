import { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

const AlbumSearch = ({ onSelectAlbum }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/getAccessToken',
          null,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
              grant_type: 'client_credentials',
            },
          }
        );
        const token = response.data.accessToken;
        setAccessToken(token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    getAccessToken();
  }, []);

  const handleSearch = async () => {
    try {
      const apiUrl = 'https://api.spotify.com/v1/search';
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: query,
          type: 'album',
        },
      });

      setSearchResults(response.data.albums.items);
    } catch (error) {
      console.error('Error searching albums:', error);
    }
  };

  const handleAlbumSelect = (selectedAlbum) => {
    const albumInfo = {
      name: selectedAlbum.name,
      artists: selectedAlbum.artists,
      // Add more properties based on the album structure
    };

    // Use the router's push method to navigate with state
    console.log('Album Info to be Passed:', albumInfo);
    router.push({
      pathname: '/create-post',
      query: { albumId: selectedAlbum.id, albumInfo: JSON.stringify(albumInfo) },
    });
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for an album..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </InputGroup>

      <div className="d-flex flex-wrap">
        {searchResults?.map((album) => (
          <Card key={album.id} style={{ width: '18rem', margin: '10px' }} onClick={() => handleAlbumSelect(album)}>
            <Card.Img variant="top" src={album.images[0]?.url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              <Card.Text>{album.artists[0].name}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlbumSearch;