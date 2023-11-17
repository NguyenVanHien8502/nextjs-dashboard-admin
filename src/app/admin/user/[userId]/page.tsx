"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { getStogare } from "@/app/helper/stogare";
import { useEffect, useState } from "react";

const ViewUserDetail = ({ params }: { params: { userId: string } }) => {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/user/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data);
    };
    fetchUser();
  }, [params.userId, token]);

  return (
    <>
      <div className="my-3">
        <Link href={"/admin/user"}>Go back</Link>
      </div>

      <br />
      <br />
      <Card className="text-center">
        <Card.Header>
          <h2>Thông tin cá nhân của người dùng</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>Username: {user?.username}</Card.Text>
          <Card.Text>Email: {user?.email}</Card.Text>
          <Card.Text>Phone Number: {user?.phone}</Card.Text>
          <Card.Text>Role: {user?.role}</Card.Text>
          <Card.Text>Status: {user?.status}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Text>CreatedAt: {user?.createdAt}</Card.Text>
          <Card.Text>UpdatedAt: {user?.updatedAt}</Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ViewUserDetail;
