"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

interface Iprops {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateModal(props: Iprops) {
  const { showModalCreate, setShowModalCreate } = props;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  const handleSubmitForm = async () => {
    await axios.post(
      "http://localhost:5000/api/product/create-product",
      {
        title: title,
        description: description,
        price: price,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5NzZlODFiZGU0Yjg1YzgyNDg0ZWYiLCJhZ2UiOjEwMCwiaWF0IjoxNjk3NjQ5ODYzLCJleHAiOjE2OTc2NTM0NjN9.3kzq9fIEvno3MQo7okm-qIlPzBTGlBxDaGJa9xsEuVM`,
        },
      }
    );

    toast.success("Create succeed !...");
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setTitle("");
    setDescription("");
    setPrice(undefined);
    setQuantity(undefined);
    setShowModalCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={price !== undefined ? price.toString() : ""}
                onChange={(e) =>
                  setPrice(
                    e.target.value !== ""
                      ? parseFloat(e.target.value)
                      : undefined
                  )
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số lượng sản phẩm"
                value={quantity !== undefined ? quantity.toString() : ""}
                onChange={(e) =>
                  setQuantity(
                    e.target.value !== ""
                      ? parseFloat(e.target.value)
                      : undefined
                  )
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitForm()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
