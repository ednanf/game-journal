import ItemCardSmall from './ItemCardSmall/ItemCardSmall.tsx';
import styles from './YearlyCard.module.css';

type YearlyCardProps = {
  title: string;
  started: number;
  completed: number;
  dropped: number;
  paused: number;
  revisited: number;
};

const YearlyCard = ({ title, started, completed, dropped, paused, revisited }: YearlyCardProps) => (
  <div className={styles.cardContainer}>
    <div className={styles.cardHeader}>
      <h3>{title}</h3>
    </div>
    <div className={styles.cardContent}>
      <ItemCardSmall title="Started" value={started} color="started" />
      <div className={styles.divider} />
      <ItemCardSmall title="Completed" value={completed} color="completed" />
      <div className={styles.divider} />
      <ItemCardSmall title="Dropped" value={dropped} color="dropped" />
      <div className={styles.divider} />
      <ItemCardSmall title="Paused" value={paused} color="paused" />
      <div className={styles.divider} />
      <ItemCardSmall title="Revisited" value={revisited} color="revisited" />
    </div>
  </div>
);

export default YearlyCard;
