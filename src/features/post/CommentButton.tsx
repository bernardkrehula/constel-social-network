import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment';
import Modal from '../posts/Modal';
import PostModal from './PostModal';
import { usePost } from '../posts/PostContext';
import { PostUserType } from '../../types/postUserType';

type CommentButtonType = {
  type: string;
  userData?: PostUserType;
}

const CommentButton = ({ type, userData }: CommentButtonType) => {
  const { comments } = usePost();

  const baseStyle =
    'sma:py-2 sma:px-[3.2rem] smb:px-[4.6rem] smb:py-2 md:px-6 sm:py-1 text-lg md:text-base  md:py-1  sm:text-base text-figmaGrayShade2 rounded-lg transition-all duration-200 flex items-center gap-2';

  const colorsDefault =
    'bg-figmaGrayLight hover:bg-figmaGrayShade text-figmaGrayShade2 hover:text-white';

  if (type == 'modal')
    return (
      <Modal>
        <Modal.Open opens='post-modal'>
          <button className={`${baseStyle} ${colorsDefault}`}>
            <FontAwesomeIcon icon={faComment} />
            <span>{comments}</span>
          </button>
        </Modal.Open>
        <Modal.Window name='post-modal'>
          <PostModal userData={userData}/>
        </Modal.Window>
      </Modal>
    );
  
  if (type == 'dummy')
    return (
      <button className={`${baseStyle} ${colorsDefault}`}>
        <FontAwesomeIcon icon={faComment} />
        <span>{comments}</span>
      </button>
    );
};

export default CommentButton;
