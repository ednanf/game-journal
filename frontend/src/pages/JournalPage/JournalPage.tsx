import { useEffect, useState, useRef, useCallback } from 'react';
import { getUnwrapped } from '../../utils/axiosInstance.ts';
import JournalCard from '../../components/JournalCard/JournalCard.tsx';
import { BiGhost } from 'react-icons/bi';
import styles from './JournalPage.module.css';
import sharedStyles from '../shared.module.css';

type JournalEntry = {
  id: string;
  createdBy: string;
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped';
  rating: number;
  createdAt: string;
  updatedAt: string;
};

type PaginatedResponse = {
  message: string;
  entries: JournalEntry[];
  nextCursor: string | null;
};

const JournalPage = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchMoreEntries = async (currentCursor: string | null) => {
    if (!currentCursor || loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('limit', '10');
      params.append('cursor', currentCursor);

      const response = await getUnwrapped<PaginatedResponse>(
        `/journal-entries?${params.toString()}`,
      );

      setJournalEntries((prev) => [...prev, ...response.entries]);
      setCursor(response.nextCursor);
      if (!response.nextCursor) {
        setHasMore(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch more entries';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && cursor) {
          fetchMoreEntries(cursor);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, cursor],
  );

  // Effect for the initial data load ONLY
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setInitialLoad(true);

    const fetchInitialEntries = async () => {
      try {
        const params = new URLSearchParams();
        params.append('limit', '10');
        const response = await getUnwrapped<PaginatedResponse>(
          `/journal-entries?${params.toString()}`,
        );

        if (!ignore) {
          setJournalEntries(response.entries);
          setCursor(response.nextCursor);
          setHasMore(!!response.nextCursor);
        }
      } catch (err: unknown) {
        if (!ignore) {
          const message = err instanceof Error ? err.message : 'Failed to fetch journal entries';
          setError(message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setInitialLoad(false);
        }
      }
    };

    fetchInitialEntries();

    return () => {
      ignore = true;
    };
  }, []);

  const handleClick = () => {
    // Implement navigation or modal logic here
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Journal</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        <div className={styles.cardsContainer}>
          {journalEntries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} onClick={handleClick} />
          ))}
        </div>

        <div ref={loaderRef} className={styles.loader}>
          {loading && initialLoad && <p>Loading Journal...</p>}
          {loading && !initialLoad && <p>Loading More...</p>}
          {!hasMore && journalEntries.length > 0 && (
            <p className={styles.endMessage}>
              <BiGhost /> You've reached the end.
            </p>
          )}
          {error && <div className={sharedStyles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
