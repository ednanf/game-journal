import styles from './JournalCard.module.css';
import { FaChevronRight } from 'react-icons/fa6';

type JournalCardProps = {
  title: string;
  platform: string;
  status: string;
  date: string;
  onClick: () => void;
};

const JournalCard = ({ title, platform, status, date, onClick }: JournalCardProps) => {
  function statusColorLabel(status: string): string {
    switch (status) {
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
        <p>{date}</p>
      </div>
    </div>
  );
};

export default JournalCard;
