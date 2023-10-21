"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import CreateModalCategory from "../createModal/createCategory.modal";
import UpdateModalCategory from "../updateModal/updateCategory.modal";

interface Iprops {
  categories: ICategory[];
}

const CategoryTable = (props: Iprops) => {
  const { categories } = props;
  const currentUserString = localStorage.getItem("currentUser");
  let token: string | null = null;
  if (currentUserString !== null) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const [category, setCategory] = useState<ICategory | null>(null);
  const [showModalCreateCategory, setShowModalCreateCategory] =
    useState<boolean>(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] =
    useState<boolean>(false);

  return (
    <>
      <div
        className="mb-3 mt-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Category Table</h2>
        <Button
          variant="secondary"
          onClick={() => setShowModalCreateCategory(true)}
        >
          Create category
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>{category.status}</td>
              <td>{category.desc}</td>
              <td>{category.createdAt}</td>
              <td>{category.updatedAt}</td>
              <td style={{ display: "flex", gap: "5px" }}>
                <Link
                  href={`category/${category._id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => setShowModalUpdateCategory(true)}
                >
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModalCategory
        showModalCreateCategory={showModalCreateCategory}
        setShowModalCreateCategory={setShowModalCreateCategory}
      />
      <UpdateModalCategory
        showModalUpdateCategory={showModalUpdateCategory}
        setShowModalUpdateCategory={setShowModalUpdateCategory}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
};

export default CategoryTable;