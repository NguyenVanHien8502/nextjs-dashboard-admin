"use client";
import { RootState, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const MyProfile = () => {
  const currentUserString: string = useAppSelector(
    (state: RootState) => state?.userReducer?.getProfile?.profile
  );
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (currentUserString) {
      setCurrentUser(JSON.parse(JSON.stringify(currentUserString)));
    }
  }, [currentUserString]);

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
