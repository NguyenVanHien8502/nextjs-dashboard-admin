"use client";
import { Button } from "react-bootstrap";
import styles from "./signup.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerUser } from "@/redux/features/auth/authService";
import {
  registerError,
  registerStart,
  registerSuccess,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/store";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      const response = await registerUser(newUser);
      if (response?.status === true && response?.newUser) {
        toast.success(response?.msg);
        dispatch(registerSuccess());
        toast.success("Please navigate to login page to login to use service!");
        router.replace("/");
      }
      if (response?.status === false) {
        toast.error(response?.msg);
        dispatch(registerError());
      }
    } catch {
      dispatch(registerError());
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
