import styles from "./Modal.module.css";

function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText = "تایید",
  cancelText = "انصراف",
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            {cancelText}
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
