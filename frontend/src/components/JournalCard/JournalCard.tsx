import styles from './JournalCard.module.css';
import { FaChevronRight } from 'react-icons/fa6';

type JournalEntry = {
  id: string;
  title: string;
  platform: string;
  status: string;
  createdAt: string;
};

type JournalCardProps = {
  entry: JournalEntry;
  onClick: () => void;
};

const JournalCard = ({ entry, onClick }: JournalCardProps) => {
  const { title, platform, status, createdAt } = entry;

  function statusColorLabel(statusValue: string): string {
    switch (statusValue) {
      case 'completed':
        return styles.completed;
      case 'started':
        return styles.started;
      case 'dropped':
        return styles.dropped;
      default:
        return styles.defaultStatus;
    }
  }

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.mainDetails}>
        <div className={styles.headerContainer}>
          <div className={styles.cardHeader}>
            <h3>{title}</h3>
          </div>
          <div className={styles.cardSubHeader}>
            <p>{platform}</p>
          </div>
          <div className={styles.cardIcon}>
            <p>
              <FaChevronRight />
            </p>
          </div>
        </div>
      </div>
      <div className={styles.entryDetails}>
        <p className={`${statusColorLabel(status)}`}>{status}</p>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default JournalCard;
