"use client";
import { Button } from "react-bootstrap";
import styles from "./signup.module.css";
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
  const handleSignUp = async (e: any) => {
    try {
      e.preventDefault();
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
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <p className={styles.title}>Sign Up</p>
        </div>
        <form className={styles.form_container}>
          <div className={styles.inputs_container}>
            <div className={styles.inputs}>
              <label className={styles.label}>Your username:</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter your username"
                value={data.username}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.inputs}>
              <label className={styles.label}>Your email:</label>
              <input
                className={styles.input}
                type="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.inputs}>
              <label className={styles.label}>Your password:</label>
              <input
                className={styles.input}
                type="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.selects}>
              <label className={styles.label}>Your role:</label>
              <select
                className={styles.select}
                name="role"
                id="role"
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
          <div className={styles.button_container}>
            <Button
              type="submit"
              className={styles.button}
              onClick={(e) => handleSignUp(e)}
            >
              Sign up
            </Button>
          </div>
        </form>
        <div className={styles.text_last_container}>
          <p className={styles.text_last}>Are you already account?</p>
          <Link href={"/"} className={styles.signin_link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
