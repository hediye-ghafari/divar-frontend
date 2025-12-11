import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./OptionForm.module.css";

export default function OptionForm({
  schema,
  defaultValues,
  onSubmit,
  submitText,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.label}>عنوان</label>
      <input className={styles.input} {...register("title")} />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <label className={styles.label}>کلید</label>
      <input className={styles.input} {...register("key")} />
      {errors.key && <p className={styles.error}>{errors.key.message}</p>}

      <label className={styles.label}>دسته‌بندی</label>
      <input className={styles.input} {...register("category")} />

      <label className={styles.label}>نوع</label>
      <select className={styles.select} {...register("type")}>
        <option value="text">متن</option>
        <option value="number">عدد</option>
        <option value="select">انتخابی</option>
        <option value="checkbox">چک‌باکس</option>
      </select>

      <label className={styles.label}>GUID</label>
      <input className={styles.input} {...register("guid")} />

      <div className={styles.checkboxBox}>
        <input type="checkbox" {...register("required")} />
        <span>اجباری</span>
      </div>

      <label className={styles.label}>Enum</label>
      <input className={styles.input} {...register("enumValues")} />

      <button type="submit" className={styles.button}>
        {submitText}
      </button>
    </form>
  );
}
