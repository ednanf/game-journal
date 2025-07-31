import styles from './LandingPage.module.css';
import sharedStyles from './shared.module.css';

const JournalPage = () => {
  const entries = [
    { id: 1, title: 'Played "Cyberpunk 2077"', date: '2024-10-26' },
    { id: 2, title: 'Finished "The Witcher 3"', date: '2024-10-24' },
    { id: 3, title: 'Started "Baldur\'s Gate 3"', date: '2024-10-22' },
    { id: 1, title: 'Played "Cyberpunk 2077"', date: '2024-10-26' },
    { id: 2, title: 'Finished "The Witcher 3"', date: '2024-10-24' },
    { id: 3, title: 'Started "Baldur\'s Gate 3"', date: '2024-10-22' },
    { id: 1, title: 'Played "Cyberpunk 2077"', date: '2024-10-26' },
    { id: 2, title: 'Finished "The Witcher 3"', date: '2024-10-24' },
    { id: 3, title: 'Started "Baldur\'s Gate 3"', date: '2024-10-22' },
  ];

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.journalContent}>
        <h2>Journal</h2>
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                background: 'var(--color-surface)',
              }}
            >
              <h3>{entry.title}</h3>
              <p>{entry.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default JournalPage;
