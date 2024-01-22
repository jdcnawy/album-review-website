import { useEffect } from "react"; 
import { useRouter } from "next/router"; 
import { Container, Row, Col } from "react-bootstrap";
import CreateUserForm from "@/frontend/components/CreateUserForm";

export default function CreateUser({ createUser, isLoggedIn }) {
  const router = useRouter(); 

  useEffect(() => {
    if (isLoggedIn) router.push("/"); 
  }, [isLoggedIn]); 

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col>
            <h1>Create User</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <CreateUserForm createUser={createUser}/> 
          </Col>
        </Row>
      </Container>
    </>
  );
}