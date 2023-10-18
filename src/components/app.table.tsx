"use client";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CreateModal from "./create.modal";
import { useState } from "react";

interface Iprops {
  products: IProduct[];
}

const AppTable = (props: Iprops) => {
  const { products } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

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
              <td>
                <Button>View</Button>
                <Button variant="warning" className="mx-3">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
    </>
  );
};

export default AppTable;
