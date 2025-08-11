// frontend/src/components/JournalCard/JournalCard.tsx
import { Link } from 'react-router-dom';
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
  to: string;
};

const JournalCard = ({ entry, to }: JournalCardProps) => {
  // Destructure the props the came packed into entry to be used
  const { title, platform, status, createdAt } = entry;

  function statusColorLabel(statusValue: string): string {
    switch (statusValue) {
      case 'completed':
        return styles.completed;
      case 'started':
        return styles.started;
      case 'revisited':
        return styles.revisited;
      case 'paused':
        return styles.paused;
      case 'dropped':
        return styles.dropped;
      default:
        return styles.defaultStatus;
    }
  }

  return (
    <Link to={to} className={styles.link}>
      <div className={styles.cardContainer}>
        <div className={styles.mainDetails}>
          <div className={styles.headerContainer}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.cardSubHeader}>
                <p>{platform}</p>
              </div>
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
          <p className={styles.date}>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default JournalCard;
