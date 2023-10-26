"use client";
import { Button } from "react-bootstrap";
import styles from "../../styles/auth.module.css";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/user/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );
      if (response.data?.status === true) {
        toast.success("Congratulation!!! You have successfully registered.");
        router.replace("/");
      }
    } catch (error) {
      throw new Error("error");
    }
  };
  return (
    <>
      <main className={styles["container"]}>
        <div className={styles["text-container"]}>
          <p className={styles["text"]}>Sign Up</p>
        </div>
        <div className={styles["inputs-container"]}>
          <div className={styles["inputs"]}>
            <label>Your username:</label>
            <input
              type="text"
              placeholder="Username"
              value={data.username}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles["inputs"]}>
            <label>Your email:</label>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles["inputs"]}>
            <label>Your password:</label>
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <Button
          style={{ width: "100%", marginTop: "30px" }}
          onClick={() => handleSignUp()}
        >
          Sign up
        </Button>
        <div className={styles["text-last-container"]}>
          <p>Are you already account?</p>
          <Link href={"/"}>Sign in</Link>
        </div>
      </main>
    </>
  );
}
