import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteCategory, getCategory } from "services/admin";
import Loader from "../modules/Loader";

import styles from "./categoryList.module.css";
import toast from "react-hot-toast";

import Modal from "../modules/Modal";
function CategoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const { mutate: removeCategory, isPending } = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      setIsModalOpen(false);
      toast.success("این دسته بندی با موفقیت حذف شد ✅");
    },
    onError: () => {
      toast.error("خطا در حذف این دسته بندی ❌");
    },
  });
  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    removeCategory(selectedId);
  };

  console.log({ data, isLoading });
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <>
            <div key={i.id}>
              <img src={`${i.icon}.svg`} />
              <h5>{i.name}</h5>
              <p>slug: {i.slug}</p>
              <button
                className={styles.deleteBtn}
                onClick={() => openModal(i._id)}
                disabled={isPending}
              >
                {isPending ? "..." : "حذف"}
              </button>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDelete}
              title="آیا از حذف این دسته بندی مطمئن هستید؟"
              confirmText="حذف"
              cancelText="انصراف"
            />
          </>
        ))
      )}
    </div>
  );
}

export default CategoryList;
