import sharedStyles from '../shared.module.css';
import styles from './StatisticsPage.module.css';

const StatisticsPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.statisticsContent}>
        <h2>Statistics</h2>
      </div>
    </div>
  );
};
export default StatisticsPage;
