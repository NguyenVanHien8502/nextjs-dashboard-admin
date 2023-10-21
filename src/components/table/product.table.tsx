"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
import UpdateModalProduct from "../updateModal/updateProduct.modal";
import CreateModalProduct from "../createModal/createProduct.modal";

interface Iprops {
  products: IProduct[];
}

const ProductTable = (props: Iprops) => {
  const { products } = props;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure want to delete this product? ")) {
      await axios.delete(`http://localhost:5000/api/product/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5NzZlODFiZGU0Yjg1YzgyNDg0ZWYiLCJhZ2UiOjEwMCwiaWF0IjoxNjk3Njg3ODg4LCJleHAiOjE2OTc2OTE0ODh9.nct0ivKS1XzIJElJbNjBiiXuaUGXFdYhCAAKyuAAIBc`,
        },
      });
      toast.success("Deleted product succeed !...");
      mutate("http://localhost:5000/api/product");
    }
  };

  return (
    <>
      <div
        className="mb-3 mt-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Product Table</h2>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Create product
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sold</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.sold}</td>
              <td>{product.createdAt}</td>
              <td>{product.updatedAt}</td>
              <td>
                <Link
                  href={`products/${product._id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
                <Button
                  variant="warning"
                  className="mx-3"
                  onClick={() => {
                    setProduct(product);
                    setShowModalUpdate(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModalProduct
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModalProduct
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        product={product}
        setProduct={setProduct}
      />
    </>
  );
};

export default ProductTable;
