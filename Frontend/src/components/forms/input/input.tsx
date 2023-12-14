import styles from "./input.module.css";

interface InputProps {
  register: any;
  name: string;
  [key: string]: any;
}

export default function Input({ register, name, ...props }: InputProps) {
  return <input className={styles.input} {...register(name)} {...props} />;
}
