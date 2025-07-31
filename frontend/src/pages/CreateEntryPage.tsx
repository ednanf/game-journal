import styles from './CreateEntryPage.module.css';
import sharedStyles from './shared.module.css';

const CreateEntryPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.createEntryContent}>
        <h2>Create Entry</h2>
      </div>
    </div>
  );
};
export default CreateEntryPage;
