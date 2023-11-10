"use client";
import { RootState, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const MyProfile = () => {
  const router = useRouter();

  const currentUserString: string = useAppSelector(
    (state: RootState) => state?.userReducer?.getProfile?.profile
  );
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (currentUserString) {
      setCurrentUser(JSON.parse(JSON.stringify(currentUserString)));
    }
  }, [currentUserString]);

  const goToChangePassword = () => {
    router.replace("/admin/profile/changePassword");
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <Link href={"/admin"}>Go back</Link>
        <Button variant="secondary" onClick={() => goToChangePassword()}>
          Change Password
        </Button>
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
