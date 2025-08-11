import ItemCard from './ItemCard/ItemCard.tsx';
import styles from './LifetimeCard.module.css';

type LifetimeCardProps = {
  title: string;
  started: number;
  completed: number;
  dropped: number;
  paused: number;
  revisited: number;
};

const LifetimeCard = ({
  title,
  started,
  completed,
  dropped,
  paused,
  revisited,
}: LifetimeCardProps) => (
  <div className={styles.cardContainer}>
    <div className={styles.cardHeader}>
      <h3>{title}</h3>
    </div>
    <div className={styles.cardContentGrid}>
      {/* First row */}
      <ItemCard title="Started" value={started} color="started" />
      <div className={styles.divider} />
      <ItemCard title="Completed" value={completed} color="completed" />
      <div className={styles.divider} />
      <ItemCard title="Dropped" value={dropped} color="dropped" />
      {/* Second row */}
      <ItemCard title="Paused" value={paused} color="paused" />
      <div className={styles.divider} />
      <ItemCard title="Revisited" value={revisited} color="revisited" />
      <div className={styles.divider} />
      {/* Empty cell at gridColumn: 5, gridRow: 2 */}
    </div>
  </div>
);

export default LifetimeCard;
