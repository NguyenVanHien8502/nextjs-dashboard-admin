"use client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface Iprops {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  product: IProduct | null;
  setProduct: (value: IProduct | null) => void;
}

function UpdateModal(props: Iprops) {
  const { showModalUpdate, setShowModalUpdate, product, setProduct } = props;

  const [id, setId] = useState("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    if (product && product._id) {
      setId(product._id);
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
    }
  }, [product]);

  const handleSubmitForm = async () => {
    if (!title || !description || !price || !quantity) {
      toast.error("Please complete all information");
      return;
    }
    await axios.put(
      `http://localhost:5000/api/product/${id}`,
      {
        title: title,
        description: description,
        price: price,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5NzZlODFiZGU0Yjg1YzgyNDg0ZWYiLCJhZ2UiOjEwMCwiaWF0IjoxNjk3NjgzMzQwLCJleHAiOjE2OTc2ODY5NDB9.uD2o7hfBm8vDZlTmLKKSj7chW4a906g3Wj9O15OdWfE`,
        },
      }
    );

    toast.success("Updated product succeed !...");
    handleCloseModal();
    mutate("http://localhost:5000/api/product");
  };

  const handleCloseModal = () => {
    setTitle("");
    setDescription("");
    setPrice(undefined);
    setQuantity(undefined);
    setProduct(null);
    setShowModalUpdate(false);
  };

  return (
    <>
      <Modal
        show={showModalUpdate}
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

export default UpdateModal;
