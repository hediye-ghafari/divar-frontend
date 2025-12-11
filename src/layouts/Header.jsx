import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import Modal from "components/modules/Modal";
import { logout } from "src/services/auth";
import { getProfile } from "services/user";

import styles from "./Header.module.css";
function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const user = data?.data;

  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    queryClient.setQueryData(["profile"], null);
    setShowModal(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <Link to="/auth">
          <span>
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
        </Link>
        {!isLoading &&
          (user ? (
            <Link to="/dashboard" className={styles.button}>
              ثبت آگهی
            </Link>
          ) : (
            <Link to="/auth" className={styles.button}>
              ورود/ثبت
            </Link>
          ))}
        {user && (
          <button
            onClick={() => setShowModal(true)}
            className={styles.logoutButton}
          >
            خروج از حساب
          </button>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        title="آیا از خروج از حساب مطمئن هستید؟"
        confirmText="خروج"
        cancelText="انصراف"
      />
    </header>
  );
}

export default Header;
