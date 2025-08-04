import React, { useState } from 'react';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import DropDown from '../../components/Form/DropDown/DropDown.tsx';
import { gamingPlatforms } from '../../data/platforms.ts';
import { gameStatus } from '../../data/status.ts';
import styles from './CreateEntryPage.module.css';
import sharedStyles from '../shared.module.css';

type FormData = {
  title: string;
  platform: string;
  status: string;
  rating: number;
};

const CreateEntryPage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    platform: '',
    status: '',
    rating: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Extract name (name of the form field) and value from the event
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Create Entry</h2>
      </div>
      <div className={styles.formContent}>
        <form>
          <TextInput label={'Title'} id={'title'} name={'title'} type={'text'} />
          <DropDown
            label={'Platform'}
            id={'platform'}
            name={'platform'}
            onChange={handleChange}
            size={1}
            value={formData.platform}
            values={gamingPlatforms}
            placeholder={'Select a platform...'}
          />
          <DropDown
            label={'Status'}
            id={'status'}
            name={'status'}
            onChange={handleChange}
            size={1}
            value={formData.status}
            values={gameStatus}
            placeholder={'Select status...'}
          />
        </form>
      </div>
    </div>
  );
};
export default CreateEntryPage;
