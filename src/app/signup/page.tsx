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
    role: "",
  });
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/user/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
        }
      );

      if (response?.data?.status === false) {
        toast.warning(response?.data?.msg);
        return;
      }

      if (response.data?.status === true) {
        toast.success(response?.data?.msg);
        router.replace("/");
      }
    } catch {
      toast.error("Error! An error occurred. Please try again later");
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
          <div>
            <label>Your role:</label>
            <select
              name="role"
              id="role"
              placeholder="Chọn role"
              value={data.role}
              onChange={(e) =>
                setData((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="">Chọn role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
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
