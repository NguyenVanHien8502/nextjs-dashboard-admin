"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

const ViewUserDetail = ({ params }: { params: { categoryId: string } }) => {
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }
  const fetcher: Fetcher<ICategory, string> = (url: string) =>
    axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.BASE_URL}/category/${params.categoryId}`,
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
        <Link href={"/admin/category"}>Go back</Link>
      </div>

      <br />
      <br />
      <Card className="text-center">
        <Card.Header>
          <h2>Thông tin chi tiết category</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>Name: {data?.name}</Card.Text>
          <Card.Text>Slug: {data?.slug}</Card.Text>
          <Card.Text>Status: {data?.status}</Card.Text>
          <Card.Text>Description: {data?.desc}</Card.Text>
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
