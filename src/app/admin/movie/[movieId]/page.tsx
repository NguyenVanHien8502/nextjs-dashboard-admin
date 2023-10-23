"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

const ViewUserDetail = ({ params }: { params: { movieId: string } }) => {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }
  const fetcher: Fetcher<IMovie, string> = (url: string) =>
    axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/movie/${params.movieId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
    console.log(11);
  }
  return (
    <>
      <div className="my-3">
        <Link href={"/admin/movie"}>Go back</Link>
      </div>

      <br />
      <br />
      <Card className="text-center">
        <Card.Header>
          <h2>Thông tin chi tiết movie</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>Name: {data?.name}</Card.Text>
          <Card.Text>Slug: {data?.slug}</Card.Text>
          <Card.Text>Category: {data?.category}</Card.Text>
          <Card.Text>Link: {data?.link}</Card.Text>
          <Card.Text>Status: {data?.status}</Card.Text>
          <Card.Text>Description: {data?.desc}</Card.Text>
          <Card.Text>Author: {data?.author}</Card.Text>
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
