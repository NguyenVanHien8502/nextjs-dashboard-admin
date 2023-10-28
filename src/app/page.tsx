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
      const response = await axios.post(`${process.env.BASE_URL}/user/login`, {
        email: data?.email,
        password: data?.password,
      });
      
      if (response?.data?.status === false) {
        toast.warning(response?.data?.msg);
        return;
      }

      const currentUser = response?.data?.user;
      if (response?.data?.status === true && currentUser) {
        router.push("/admin");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        toast.success(response?.data?.msg);
      }
    } catch {
      toast.error("Error! An error occurred. Please try again later");
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
