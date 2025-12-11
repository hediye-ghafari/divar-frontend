import OptionForm from "./OptionForm";
import styles from "./OptionEditModal.module.css";
import { useEffect } from "react";

export default function OptionEditModal({
  isOpen,
  option,
  schema,
  onClose,
  onSubmit,
}) {
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
      <div className={styles.modal}>
        <h3 className={styles.title}>ویرایش آپشن</h3>

        <OptionForm
          schema={schema}
          defaultValues={{
            ...option,
            enumValues: option?.enum?.join(","),
          }}
          submitText="ذخیره تغییرات"
          onSubmit={onSubmit}
        />

        <button onClick={onClose} className={styles.closeBtn}>
          بستن
        </button>
      </div>
    </div>
  );
}
