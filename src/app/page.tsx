"use client";
import { Button } from "react-bootstrap";
import styles from "../styles/auth.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      const currentUser = response.data?.user;
      if (response.data?.status === true && currentUser) {
        toast.success("You have successfully loginned");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        router.push("/admin");
      } else {
        toast.error("Incorrect email or password information");
      }
    } catch (error) {
      throw new Error("error");
    }
  };
  return (
    <main className={styles["container"]}>
      <div className={styles["text-container"]}>
        <p className={styles["text"]}>Login</p>
      </div>
      <div className={styles["inputs-container"]}>
        <div className={styles["inputs"]}>
          <label>Your email:</label>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) =>
              setData((prevData) => ({ ...prevData, email: e.target.value }))
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
      <div className={styles["forgot-password"]}>
        <Link href={"forgotpassword"}>Forgot password?</Link>
      </div>
      <Button style={{ width: "100%" }} onClick={() => handleLogin()}>
        Login
      </Button>
      <div className={styles["text-last-container"]}>
        <p>Haven`t you already account?</p>
        <Link href={"signup"}>Sign up</Link>
      </div>
    </main>
  );
}
