import JournalCard from '../../components/JournalCard/JournalCard.tsx';
import styles from './JournalPage.module.css';
import sharedStyles from '../shared.module.css';

const JournalPage = () => {
  const entries = [
    {
      id: 1,
      title: 'Played "Cyberpunk 2077"',
      platform: 'nintendo switch',
      status: 'completed',
      date: '2024-10-26',
    },
    {
      id: 2,
      title: 'Finished "The Witcher 3"',
      platform: 'nintendo switch',
      status: 'completed',
      date: '2024-10-24',
    },
    {
      id: 3,
      title: 'Started "Baldur\'s Gate 3"',
      platform: 'nintendo switch',
      status: 'completed',
      date: '2024-10-22',
    },
    {
      id: 1,
      title: 'Played "Cyberpunk 2077"',
      platform: 'nintendo switch',
      status: 'completed',
      date: '2024-10-26',
    },
    {
      id: 2,
      title: 'Finished "The Witcher 3"',
      platform: 'nintendo switch',
      status: 'completed',
      date: '2024-10-24',
    },
    {
      id: 3,
      title: 'Started "Baldur\'s Gate 3"',
      platform: 'nintendo switch',
      status: 'completed',
      date: '2024-10-22',
    },
  ];

  const handleClick = () => {};

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Journal</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        <div className={styles.cardsContainer}>
          {entries.map((entry) => (
            <JournalCard
              date={entry.date}
              onClick={handleClick}
              platform={entry.platform}
              status={entry.status}
              title={entry.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default JournalPage;
