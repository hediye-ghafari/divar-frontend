import api from "configs/api";

// Create Option
export const addOption = async (optionData) => {
  const formData = new URLSearchParams();

  formData.append("title", optionData.title);
  formData.append("key", optionData.key);
  formData.append("category", optionData.category);
  formData.append("guid", optionData.guid || "");
  formData.append("required", optionData.required === false ? "false" : "true");

  formData.append("type", optionData.type);

  if (Array.isArray(optionData.enum)) {
    optionData.enum.forEach((val) => {
      formData.append("enum", val);
    });
  } else {
    formData.append("enum", optionData.enum || "");
  }

  const res = await api.post("/option", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};

// Get Options
export const getOptions = async () => {
  const res = await api.get("/option");

  if (Array.isArray(res.data)) {
    return res.data;
  }
  if (Array.isArray(res.data?.data)) {
    return res.data.data;
  }
  return [];
};

export const getOptionById = (id) => api.get(`/option/${id}`);

export const updateOption = (id, data) => api.put(`/option/${id}`, data);

export const deleteOption = (id) => api.delete(`/option/${id}`);
