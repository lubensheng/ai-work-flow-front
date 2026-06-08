import styles from "./index.module.less";
import personSvg from "../../../assets/person.svg";

interface ViewProps {
  content: string;
}

function UserAskContent(props: ViewProps) {
  const { content } = props;
  return (
    <div className={styles["ask-content-container"]}>
      <div className={styles["user-icon"]}>
        <img src={personSvg} className="w-[24px] h-[24px]" />
      </div>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default UserAskContent;
