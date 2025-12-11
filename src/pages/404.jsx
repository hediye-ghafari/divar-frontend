import styles from "./404.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.title}> صفحه مورد نظر پیدا نشد</p>
      <p className={styles.description}>
        به نظر می‌رسد این صفحه حذف شده یا آدرس آن اشتباه است.
      </p>
      <a href="/" className={styles.button}>
        بازگشت به خانه
      </a>
    </div>
  );
}

export default PageNotFound;
