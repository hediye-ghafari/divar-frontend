import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOptionById } from "services/option";
import styles from "./OptionDetailModal.module.css";

export default function OptionDetailModal({ isOpen, optionId, onClose }) {
  const {
    data: option,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["option", optionId],
    queryFn: () => getOptionById(optionId).then((res) => res.data),
    enabled: !!optionId && isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>جزئیات آپشن</h3>

        {isLoading && <p>در حال بارگذاری...</p>}
        {error && <p>خطا در دریافت داده</p>}

        {option && (
          <div className={styles.detail}>
            <p>
              <strong>عنوان:</strong> {option.title}
            </p>
            <p>
              <strong>کلید:</strong> {option.key}
            </p>
            <p>
              <strong>نوع:</strong> {option.type}
            </p>
            <p>
              <strong>Required:</strong> {option.required ? "بلی" : "خیر"}
            </p>
            <p>
              <strong>GUID:</strong> {option.guid}
            </p>
            <p>
              <strong>Enum:</strong> {option.enum?.join(", ") || "-"}
            </p>
            <p>
              <strong>Category:</strong> {option.category}
            </p>
          </div>
        )}

        <button className={styles.closeBtn} onClick={onClose}>
          بستن
        </button>
      </div>
    </div>
  );
}
