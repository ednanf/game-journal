import { useEffect, useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getUnwrapped } from '../../utils/axiosInstance.ts';
import JournalCard from '../../components/JournalCard/JournalCard.tsx';
import { TbPacman } from 'react-icons/tb';
import { PiGhostBold } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { VscError } from 'react-icons/vsc';
import styles from './JournalPage.module.css';
import sharedStyles from '../shared.module.css';

type JournalEntry = {
  id: string;
  createdBy: string;
  title: string;
  platform: string;
  status: 'started' | 'completed' | 'dropped' | 'revisited' | 'paused';
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

  // Stabilize fetchMoreEntries with useCallback.
  const fetchMoreEntries = useCallback(async () => {
    // Prevent multiple fetches or fetching when there's no more data.
    if (loading || !hasMore || !cursor) return;

    setLoading(true);
    setError(null);

    try {
      // Use URLSearchParams for query string construction.
      const params = new URLSearchParams();
      params.append('limit', '10'); // Consistent limit for pagination.
      params.append('cursor', cursor); // Safely use the cursor from state.

      const response = await getUnwrapped<PaginatedResponse>(
        `/journal-entries?${params.toString()}`,
      );

      setJournalEntries((prev) => [...prev, ...response.entries]);

      // Update cursor for the next fetch.
      setCursor(response.nextCursor);

      // Update hasMore based on the presence of nextCursor.
      setHasMore(!!response.nextCursor);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch more entries.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, cursor]);

  // Use useCallback to memoize the loaderRef function, ensuring it does not change on every render.
  // This prevents unnecessary re-creations of the IntersectionObserver.
  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return; // Prevent setting up observer if already loading.
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer if it exists.

      // Create a new IntersectionObserver instance.
      // This ensures that the observer is stable and does not change on every render.
      // The observer will only trigger fetchMoreEntries when the loader is intersecting.
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Call the stable fetchMoreEntries function.
          void fetchMoreEntries();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, fetchMoreEntries], // The dependency array is now correct and stable.
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
          const message = err instanceof Error ? err.message : 'Failed to fetch journal entries.';
          setError(message);
          toast.error(message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setInitialLoad(false);
        }
      }
    };

    void fetchInitialEntries();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Journal</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        <div className={styles.cardsContainer}>
          {/* Journal entry cards */}
          {journalEntries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} to={`/details/${entry.id}`} />
          ))}
        </div>
        <div ref={loaderRef} className={styles.loader}>
          {/* Loader for infinite scroll */}
          {loading && initialLoad && (
            <div className={sharedStyles.centerLoader}>
              <div className={sharedStyles.loader}></div>
            </div>
          )}
          {/* Loader for subsequent entries */}
          {loading && !initialLoad && (
            <div className={sharedStyles.centerLoaderSlim}>
              <div className={sharedStyles.loader}></div>
            </div>
          )}
          {/* Loader for no more entries */}
          {!hasMore && journalEntries.length > 0 && (
            <>
              <p className={styles.endMessageDecoration}>
                <TbPacman size={30} /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
                <GoDotFill /> <GoDotFill /> <GoDotFill />
                <PiGhostBold size={30} />
              </p>
              <p className={styles.endMessage}>Nothing to see beyond here...</p>
            </>
          )}
          {/* Loader for error state */}
          {journalEntries.length === 0 && error && (
            <div className={sharedStyles.error}>
              <VscError size={30} />
              {error}
            </div>
          )}
          {/* Loader for empty state */}
          {journalEntries.length === 0 && (
            <>
              <p className={styles.emptyMessage}>
                <TbPacman size={60} />
                <span>Go add some entries!</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
