import styles from './Settings.module.css';
import sharedStyles from './shared.module.css';

const SettingsPage = () => {
  return (
    <div className={sharedStyles.pageContainer}>
      <div className={styles.settingsContent}>
        <h2>Statistics</h2>
      </div>
    </div>
  );
};
export default SettingsPage;
