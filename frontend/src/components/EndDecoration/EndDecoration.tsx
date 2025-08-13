import { TbPacman } from 'react-icons/tb';
import { GoDotFill } from 'react-icons/go';
import { PiGhostBold } from 'react-icons/pi';
import styles from './EndDecoration.module.css';

type EndDecorationProps = {
  message?: string;
};

const EndDecoration = ({ message }: EndDecorationProps) => {
  return (
    <>
      <p className={styles.endMessageDecoration}>
        <TbPacman size={30} /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
        <GoDotFill /> <GoDotFill /> <GoDotFill />
        <PiGhostBold size={30} />
      </p>
      <p className={styles.endMessage}>{message}</p>
    </>
  );
};
export default EndDecoration;
