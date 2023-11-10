"use client";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { getStogare } from "@/app/helper/stogare";
import { useEffect, useState } from "react";

const ViewCategoryDetail = ({ params }: { params: { categoryId: string } }) => {
  let token: string | null = null;
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

    const [category, setCategory] = useState<ICategory | null>(null);
    useEffect(() => {
      const fetchCategory = async () => {
        const { data } = await axios.get(
          `${process.env.BASE_URL}/category/${params.categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(data);
      };
      fetchCategory();
    }, [params.categoryId, token]);
  
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
          <Card.Text>Name: {category?.name}</Card.Text>
          <Card.Text>Slug: {category?.slug}</Card.Text>
          <Card.Text>Status: {category?.status}</Card.Text>
          <Card.Text>Description: {category?.desc}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Text>CreatedAt: {category?.createdAt}</Card.Text>
          <Card.Text>UpdatedAt: {category?.updatedAt}</Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ViewCategoryDetail;
