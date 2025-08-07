import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postUnwrapped } from '../../utils/axiosInstance.ts';
import { API_BASE_URL } from '../../config/apiURL.ts';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import DropDown from '../../components/Form/DropDown/DropDown.tsx';
import Slider from '../../components/Form/Slider/Slider.tsx';
import Button from '../../components/Button/Button.tsx';
import { gamingPlatforms } from '../../data/platforms.ts';
import { gameStatus } from '../../data/status.ts';
import sharedStyles from '../shared.module.css';

type FormData = {
  title: string;
  platform: string;
  status: string;
  rating: number;
};

interface CreationResponse {
  message: string;
}

// Errors won't include rating as there's a default value
type FormErrors = Partial<FormData>;

const CreateEntryPage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    platform: '',
    status: '',
    rating: 5,
  });
  const [errors, setErrors] = useState<FormErrors>({
    title: '',
    platform: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to check if the form is ready for submission
  // This checks if title, platform, and status are not empty
  // Rating is not checked here as it has a default value and is only relevant when status is 'completed'
  const isFormReady = () => {
    return (
      formData.title.trim() !== '' &&
      formData.platform.trim() !== '' &&
      formData.status.trim() !== ''
    );
  };

  // Validation function to check for empty values
  const validate = (data: FormErrors) => {
    const newErrors: FormErrors = {
      title: '',
      platform: '',
      status: '',
    };
    if (!data.title) {
      newErrors.title = 'Please enter a title';
    }
    if (!data.platform) {
      newErrors.platform = 'Please, select a platform';
    }
    if (!data.status) {
      newErrors.status = 'Please, select a status';
    }
    // Rating doesn't need validation as it's a slider with default value
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Extract name (name of the form field) and value from the event
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({ title: '', platform: '', status: '' });

    const validationErrors = validate(formData);
    if (validationErrors.title || validationErrors.platform || validationErrors.status) {
      setErrors(validationErrors);
      return;
    }

    // Needed because when the slider is used, the value becomes a string at runtime
    const submissionData = {
      ...formData,
      rating: Number(formData.rating),
    };

    setIsLoading(true);

    try {
      const response = await postUnwrapped<CreationResponse>(
        `${API_BASE_URL}/journal-entries`,
        submissionData,
      );

      toast.success(response.message);

      navigate('/journal');
    } catch (error) {
      toast.error((error as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Create Entry</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        <form onSubmit={handleSubmit}>
          <div className={sharedStyles.formInputs}>
            <TextInput
              label={'Title'}
              id={'title'}
              name={'title'}
              type={'text'}
              value={formData.title}
              placeholder={'Enter a title...'}
              onChange={handleChange}
              error={errors.title}
            />
            <DropDown
              label={'Platform'}
              id={'platform'}
              name={'platform'}
              size={1}
              value={formData.platform}
              values={gamingPlatforms}
              placeholder={'Select a platform...'}
              onChange={handleChange}
              error={errors.platform}
            />
            <DropDown
              label={'Status'}
              id={'status'}
              name={'status'}
              size={1}
              value={formData.status}
              values={gameStatus}
              placeholder={'Select status...'}
              onChange={handleChange}
              error={errors.status}
            />
            <Slider
              label={'Rating'}
              name={'rating'}
              min={0}
              max={10}
              value={formData.rating}
              onChange={handleChange}
              disabled={formData.status !== 'completed'}
            />
            <div className={sharedStyles.formButton}>
              <Button type={'submit'} color={'default'} disabled={isLoading || !isFormReady()}>
                {isLoading ? 'Creating entry...' : 'Add entry'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateEntryPage;
