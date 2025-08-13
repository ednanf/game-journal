import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getUnwrappedWithParams,
  patchUnwrapped,
  deleteUnwrapped,
} from '../../utils/axiosInstance.ts';
import formatDisplayDate from '../../utils/formatDisplayDate.ts';
import TextInput from '../../components/Form/TextInput/TextInput.tsx';
import DropDown from '../../components/Form/DropDown/DropDown.tsx';
import Slider from '../../components/Form/Slider/Slider.tsx';
import Button from '../../components/Button/Button.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import { gameStatus } from '../../data/status.ts';
import { gamingPlatforms } from '../../data/platforms.ts';
import styles from './DetailsPage.module.css';
import sharedStyles from '../shared.module.css';

type StatusType = 'started' | 'completed' | 'dropped';

type JournalEntry = {
  id: string;
  createdBy: string;
  title: string;
  platform: string;
  status: StatusType;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

type FormErrors = {
  title?: string;
  platform?: string;
  status?: string;
};

type ServerResponse = {
  message: string;
  entry: JournalEntry;
};

const DetailsPage = () => {
  const [formData, setFormData] = useState<JournalEntry | undefined>(undefined);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchEntry = async () => {
      setIsLoading(true);
      try {
        const response = await getUnwrappedWithParams<{
          message: string;
          entry: JournalEntry;
        }>(`/journal-entries/${id}`);
        setFormData(response.entry);
      } catch (error) {
        toast.error((error as { message: string }).message);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEntry();
  }, [id]);

  // Validation function
  const validate = (data: JournalEntry): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.title || data.title.trim() === '') {
      newErrors.title = 'Please enter a title';
    }
    if (!data.platform || data.platform.trim() === '') {
      newErrors.platform = 'Please, select a platform';
    }
    if (!data.status) {
      newErrors.status = 'Please, select a status';
    }
    return newErrors;
  };

  // Handles input changes, with type safety for rating and status
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (!prev) return prev;
      if (name === 'rating') {
        return { ...prev, rating: Number(value) };
      }
      if (name === 'status') {
        // Only allow valid status values - kind of exaggerated, but ensures type safety
        if (['started', 'completed', 'revisited', 'paused', 'dropped'].includes(value)) {
          return { ...prev, status: value as StatusType };
        }
        return prev;
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const dataToPatch = {
          title: formData.title,
          platform: formData.platform,
          status: formData.status,
          rating: formData.status === 'completed' ? formData.rating : 5,
        };

        const updateData = await patchUnwrapped<ServerResponse>(
          `/journal-entries/${id}`,
          dataToPatch,
        );
        toast.success(updateData.message || 'Entry updated successfully!');
        navigate('/journal');
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const handleDelete = async () => {
    if (!id) {
      toast.error('No entry ID provided for deletion.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await deleteUnwrapped<ServerResponse>(`/journal-entries/${id}`);
      toast.success(response.message || 'Entry deleted successfully!');
      navigate('/journal');
    } catch (error) {
      toast.error((error as { message: string }).message);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  return (
    <div className={sharedStyles.pageContainer}>
      <div className={sharedStyles.titleContainer}>
        <h2>Details</h2>
      </div>
      <div className={sharedStyles.pageContent}>
        {isLoading || !formData ? (
          // using local styles for centering due differences in layout
          <Loader />
        ) : (
          <>
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
                <Slider
                  label={'Rating'}
                  name={'rating'}
                  min={0}
                  max={10}
                  value={formData.rating}
                  onChange={handleChange}
                  disabled={!isEditing || formData.status !== 'completed'}
                />
                {/* Save button when isEditing === true */}
                {isEditing && (
                  <>
                    <div className={sharedStyles.formButtonGroup}>
                      <Button type="submit" color="green" disabled={isLoading}>
                        {isLoading ? 'Saving entry...' : 'Save'}
                      </Button>
                      <Button
                        color={'default'}
                        disabled={false}
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
              {/* Edit button when isEditing === false */}
              {!isEditing && (
                <div className={sharedStyles.formButtonGroup}>
                  {!isDeleting ? (
                    <>
                      <Button
                        type="button"
                        color="cyan"
                        disabled={isLoading}
                        onClick={() => setIsEditing(true)}
                      >
                        {isLoading ? 'Loading...' : 'Edit'}
                      </Button>
                      <Button
                        type="button"
                        color="magenta"
                        disabled={isLoading}
                        onClick={() => setIsDeleting(true)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        color="default"
                        disabled={isLoading}
                        onClick={() => setIsDeleting(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        color="magenta"
                        disabled={isLoading}
                        onClick={handleDelete}
                      >
                        {isLoading ? 'Deleting...' : 'Confirm Delete'}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </form>
            <div className={styles.footer}>
              <p>Last updated: {formatDisplayDate(formData.updatedAt)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
