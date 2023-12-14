import styles from "./login.module.css";

interface LoginCardProps {
  children: React.ReactNode;
  title: string;
}

export default function LoginCard({ children, title }: LoginCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
}
