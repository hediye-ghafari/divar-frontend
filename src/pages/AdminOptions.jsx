import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import toast from "react-hot-toast";

import {
  getOptions,
  addOption,
  deleteOption,
  updateOption,
} from "services/option";

import OptionForm from "components/options/OptionForm";
import OptionList from "components/options/OptionList";
import OptionEditModal from "components/options/OptionEditModal";
import OptionDetailModal from "components/options/OptionDetailModal";

const schema = yup.object({
  title: yup.string().required(),
  key: yup.string().required(),
  type: yup.string().required(),
  category: yup.string().required(),
  enumValues: yup.string(),
  guid: yup.string(),
  required: yup.boolean(),
});

export default function AdminOptions() {
  const queryClient = useQueryClient();
  const [editingOption, setEditingOption] = useState(null);
  const [detailOption, setDetailOption] = useState(null);

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["options"],
    queryFn: getOptions,
  });

  const createMutation = useMutation({
    mutationFn: addOption,
    onSuccess: () => {
      toast.success("ساخته شد");
      queryClient.invalidateQueries({ queryKey: ["options"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOption,
    onSuccess: () => {
      toast.success("حذف شد");
      queryClient.invalidateQueries({ queryKey: ["options"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateOption(id, data),
    onSuccess: () => {
      toast.success("ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["options"] });
      setEditingOption(null);
    },
  });

  const handleCreate = (formData) => {
    createMutation.mutate({
      ...formData,
      enum: formData.enumValues ? formData.enumValues.split(",") : [],
      guid: formData.guid || "test-guid",
      required: formData.required ?? true,
      category: formData.category._id || formData.category,
    });
  };

  const handleUpdate = (formData) => {
    updateMutation.mutate({
      id: editingOption._id,
      data: {
        ...formData,
        enum: formData.enumValues ? formData.enumValues.split(",") : [],
        guid: formData.guid || "test-guid",
        required: formData.required ?? true,
        category: formData.category._id || formData.category,
      },
    });
  };

  const handleShowDetail = (option) => {
    setDetailOption(option);
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <h2>مدیریت آپشن‌ها</h2>

      {/* Create Form */}
      <OptionForm
        schema={schema}
        defaultValues={{ required: true, type: "text" }}
        onSubmit={handleCreate}
        submitText="ساخت"
      />

      {/* Options List */}
      <OptionList
        options={options}
        onDelete={(id) => deleteMutation.mutate(id)}
        onEdit={(opt) => setEditingOption(opt)}
        onDetail={handleShowDetail}
      />

      {/* Options Edit Modal */}
      <OptionEditModal
        isOpen={!!editingOption}
        option={
          editingOption
            ? {
                ...editingOption,
                category: editingOption.category?._id || "",
                enumValues: editingOption.enum?.join(",") || "",
              }
            : null
        }
        schema={schema}
        onClose={() => setEditingOption(null)}
        onSubmit={handleUpdate}
      />

      {/* Options Detail Modal */}
      <OptionDetailModal
        isOpen={!!detailOption}
        optionId={detailOption?._id}
        onClose={() => setDetailOption(null)}
      />
    </div>
  );
}
