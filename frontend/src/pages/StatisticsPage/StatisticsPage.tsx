import LifetimeCard from '../../components/Statistics/LifetimeCard/LifetimeCard.tsx';
import YearlyCard from '../../components/Statistics/YearlyCard/YearlyCard.tsx';
import styles from './StatisticsPage.module.css';
import sharedStyles from '../shared.module.css';
import { TbPacman } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';
import { PiGhostBold } from 'react-icons/pi';

const StatisticsPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Statistics</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        <div className={styles.lifetimeCardContainer}>
          <LifetimeCard
            completed={3}
            dropped={3}
            paused={3}
            revisited={3}
            started={3}
            title={'Lifetime'}
          />
        </div>
        <div className={styles.yearlyCardContainer}>
          <YearlyCard
            completed={4}
            dropped={4}
            paused={4}
            revisited={4}
            started={4}
            title={'2024'}
          />
        </div>
        <div>
          <p className={styles.endMessageDecoration}>
            <TbPacman size={30} /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
            <GoDotFill /> <GoDotFill /> <GoDotFill />
            <PiGhostBold size={30} />
          </p>
          <p className={styles.endMessage}>Nothing to see beyond here...</p>
        </div>
      </div>
    </div>
  );
};
export default StatisticsPage;
