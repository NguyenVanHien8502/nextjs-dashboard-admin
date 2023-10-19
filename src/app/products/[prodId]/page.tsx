"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

const ViewProductDetail = ({ params }: { params: { prodId: string } }) => {
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const fetcher: Fetcher<IProduct, string> = (url: string) =>
    axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/product/${params.prodId}`,
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
        <Link href={"/products"}>Go back</Link>
      </div>
      <Card className="text-center">
        <Card.Header>{data?.title}</Card.Header>
        <Card.Body>
          <Card.Text>{data?.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{data?.price}</Card.Footer>
      </Card>
    </>
  );
};

export default ViewProductDetail;
