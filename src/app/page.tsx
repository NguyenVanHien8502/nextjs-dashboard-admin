"use client";
import { Button } from "react-bootstrap";
import styles from "./app.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import { logIn } from "@/redux/features/auth/authService";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user: IUser | any = useAppSelector((state: RootState) => {
    state.userReducer?.login?.currentUser;
  });
  const [dataInput, setDataInput] = useState({
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      const response = await logIn(dataInput, dispatch);
      if (response?.status === true && response?.user) {
        router.push("/admin");
      }
    } catch (error) {
      toast.error("Error! An error occurred. Please try again later");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <p className={styles.title}>Login</p>
        </div>
        <form className={styles.form_container}>
          <div className={styles.inputs_container}>
            <div className={styles.inputs}>
              <label className={styles.label}>Your email:</label>
              <input
                className={styles.input}
                type="email"
                placeholder="Enter your email"
                value={dataInput.email}
                onChange={(e) =>
                  setDataInput((prevData) => ({
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
                value={dataInput.password}
                onChange={(e) =>
                  setDataInput((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className={styles.forgot_password_container}>
            <Link href={"forgotpassword"} className={styles.forgot_password}>
              Forgot password?
            </Link>
          </div>
          <div className={styles.button_container}>
            <Button
              type="submit"
              onClick={(e) => handleLogin(e)}
              className={styles.button}
            >
              Login
            </Button>
          </div>
        </form>
        <div className={styles.text_last_container}>
          <p className={styles.text_last}>Haven`t you already account?</p>
          <Link href={"signup"} className={styles.signup_link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
