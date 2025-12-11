import styles from "./OptionList.module.css";
import { TbEdit, TbListDetails } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import Modal from "../modules/Modal";

export default function OptionList({ options, onDelete, onEdit, onDetail }) {
  const [deleteOptionId, setDeleteOptionId] = useState(null);

  if (!options?.length) {
    return <p className={styles.empty}>هنوز آپشنی ثبت نشده است</p>;
  }

  return (
    <div className={styles.listBox}>
      {options.map((opt) => (
        <div key={opt._id} className={styles.optionItem}>
          <div className={styles.optionInfo}>
            <span className={styles.optionTitle}>{opt.title}</span>
            <span className={styles.optionMeta}>
              key: {opt.key} | type: {opt.type}
            </span>
          </div>

          <div className={styles.actions}>
            <button className={styles.detailBtn} onClick={() => onDetail(opt)}>
              <TbListDetails size={16} />
            </button>
            <button className={styles.editBtn} onClick={() => onEdit(opt)}>
              <TbEdit size={16} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => setDeleteOptionId(opt._id)}
            >
              <MdDeleteOutline size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteOptionId}
        onClose={() => setDeleteOptionId(null)}
        onConfirm={() => {
          onDelete(deleteOptionId);
          setDeleteOptionId(null);
        }}
        title="آیا مطمئن هستید که می‌خواهید این گزینه را حذف کنید؟"
        confirmText="حذف"
        cancelText="انصراف"
      />
    </div>
  );
}
