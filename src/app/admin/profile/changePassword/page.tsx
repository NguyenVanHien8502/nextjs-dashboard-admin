"use client";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "../profile.module.css";
import axios from "axios";
import { useState } from "react";
import { getStogare } from "@/app/helper/stogare";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  let token: string = "";
  const currentUserString = getStogare("currentUser")?.trim();
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);
    token = currentUser?.token;
  }

  const router = useRouter();

  const [inputs, setInputs] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPasword: "",
  });

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${process.env.BASE_URL}/user/change-password`,
      {
        currentPassword: inputs.currentPassword,
        newPassword: inputs.newPassword,
        confirmPassword: inputs.confirmPasword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data?.status === false) {
      toast.warning(data?.msg);
      return;
    }
    if (data?.status === true) {
      toast.success(data?.msg);
      router.replace("/admin/profile");
      return;
    }
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <Link href={"/admin/profile"}>Go back</Link>
      </div>

      <br />
      <br />
      <div className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form_container}>
            <div className={styles.inputs_container}>
              <div className={styles.inputs}>
                <label className={styles.label}>Current password:</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Enter your current password"
                  value={inputs.currentPassword}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.inputs}>
                <label className={styles.label}>New password:</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Enter your new password"
                  value={inputs.newPassword}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className={styles.inputs}>
                <label className={styles.label}>Confirm password:</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Enter your confirm password"
                  value={inputs.confirmPasword}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      confirmPasword: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={styles.button_container}>
              <Button
                type="submit"
                className={styles.button}
                onClick={(e) => handleChangePassword(e)}
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
