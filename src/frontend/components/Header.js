import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import styles from '../components/components.module.css'

const Header = ({ isLoggedIn, logoutUser, userInformation }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.Header}>
      <Navbar.Brand>
        Album Reviews!
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {isLoggedIn ? (
          <>
            <Nav.Link href={`/users/${userInformation?.uid}`} passhref="true">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} href="/all-posts" passhref="true">
              All Posts
            </Nav.Link>
            <Nav.Link as={Link} href="/create-post" passhref="true">
              Write a Review
            </Nav.Link>
            <Nav.Link as={Link} href="/album-search" passhref="true">
              Album Search
            </Nav.Link>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} href="/login" passhref="true">
              Login
            </Nav.Link>
            <Nav.Link as={Link} href="/create-user" passhref="true">
              Create User
            </Nav.Link>
          </>
        )}
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
