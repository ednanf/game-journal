import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUnwrapped } from '../../utils/axiosInstance.ts';
import LifetimeCard from '../../components/Statistics/LifetimeCard/LifetimeCard.tsx';
import YearlyCard from '../../components/Statistics/YearlyCard/YearlyCard.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import { TbPacman } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';
import { PiGhostBold } from 'react-icons/pi';
import styles from './StatisticsPage.module.css';
import sharedStyles from '../shared.module.css';

type Statistics = {
  lifetime: {
    completed: number;
    started: number;
    paused: number;
    revisited: number;
    dropped: number;
  };
  byYear: {
    [year: string]: {
      completed: number;
      started: number;
      paused: number;
      revisited: number;
      dropped: number;
    };
  };
};

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    lifetime: {
      completed: 0,
      started: 0,
      paused: 0,
      revisited: 0,
      dropped: 0,
    },
    byYear: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        const response = await getUnwrapped<Statistics>('/journal-entries/statistics');
        setStatistics(response);
      } catch (err) {
        setError((err as Error).message);
        toast.error(`Error fetching statistics: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchStatistics();
  }, [error]);

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Statistics</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        {isLoading ? (
          <Loader message={'Fetching statistics...'} />
        ) : (
          <>
            <div className={styles.lifetimeCardContainer}>
              <LifetimeCard
                completed={statistics.lifetime.completed}
                dropped={statistics.lifetime.dropped}
                paused={statistics.lifetime.paused}
                revisited={statistics.lifetime.revisited}
                started={statistics.lifetime.started}
                title={'Lifetime'}
              />
            </div>
            {Object.entries(statistics.byYear).map(([year, stats]) => (
              <div className={styles.yearlyCardContainer} key={year}>
                <YearlyCard
                  completed={stats.completed}
                  dropped={stats.dropped}
                  paused={stats.paused}
                  revisited={stats.revisited}
                  started={stats.started}
                  title={year}
                />
              </div>
            ))}
            <div>
              <p className={styles.endMessageDecoration}>
                <TbPacman size={30} /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
                <GoDotFill /> <GoDotFill /> <GoDotFill />
                <PiGhostBold size={30} />
              </p>
              <p className={styles.endMessage}>Nothing to see beyond here...</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default StatisticsPage;
