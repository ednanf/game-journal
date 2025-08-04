import styles from './EditEntryPage.module.css';
import sharedStyles from '../shared.module.css';

const EditEntryPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.editEntryContent}>
        <h2>Edit Entry</h2>
      </div>
    </div>
  );
};
export default EditEntryPage;
