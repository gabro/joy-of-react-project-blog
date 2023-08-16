import styles from "./not-found.module.css";

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1>Woops!</h1>
      <h2>The blog post you are looking for does not exist</h2>;
    </div>
  );
}

export default NotFound;

export const metadata = {
  title: "Blog post not found",
};
