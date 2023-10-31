"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

const ViewUserDetail = ({ params }: { params: { userId: string } }) => {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }
  const fetcher: Fetcher<IUser, string> = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.BASE_URL}/user/${params.userId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
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
          <Card.Text>Username: {data?.username}</Card.Text>
          <Card.Text>Email: {data?.email}</Card.Text>
          <Card.Text>Phone Number: {data?.phone}</Card.Text>
          <Card.Text>Role: {data?.role}</Card.Text>
          <Card.Text>Status: {data?.status}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Text>CreatedAt: {data?.createdAt}</Card.Text>
          <Card.Text>UpdatedAt: {data?.updatedAt}</Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ViewUserDetail;
