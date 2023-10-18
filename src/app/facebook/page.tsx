"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Facebook = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push("/");
  };
  return (
    <>
      <h1>i am facebook</h1>
      <div>
        <Button variant="primary">Hỏi dân it</Button>
        <br />
        <button onClick={() => handleBtn()}>Back home</button>
      </div>
    </>
  );
};
export default Facebook;
