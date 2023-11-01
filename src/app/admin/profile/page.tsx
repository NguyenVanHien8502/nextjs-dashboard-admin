"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";

const MyProfile = () => {
  let currentUser: IUser | null = null;
  if (typeof localStorage !== undefined) {
    const currentUserString = localStorage.getItem("currentUser");
    if (currentUserString !== null) {
      currentUser = JSON.parse(currentUserString);
    }
  } else {
    console.error("error: localStorage is undefined");
  }
  return (
    <>
      <div className="my-3">
        <Link href={"/admin"}>Go back</Link>
      </div>

      <br />
      <br />
      <Card className="text-center">
        <Card.Header>
          <h2>Thông tin cá nhân</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>Name: {currentUser?.username}</Card.Text>
          <Card.Text>Email: {currentUser?.email}</Card.Text>
          <Card.Text>Phone number: {currentUser?.phone}</Card.Text>
          <Card.Text>Role: {currentUser?.role}</Card.Text>
          <Card.Text>Status: {currentUser?.status}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <h2>The end</h2>
        </Card.Footer>
      </Card>
    </>
  );
};

export default MyProfile;
