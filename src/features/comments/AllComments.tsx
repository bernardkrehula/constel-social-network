import { useEffect, useState } from 'react';
import getAllComments from '../../api/getAllComments';
import { usePost } from '../posts/PostContext';
import Spinner from '../../ui/Spinner';
import { useGetCommentsData } from '../../hooks/useGetCommentsData';
import { setComments } from './commentsSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import SingleComment from './SingleComment';
import { memo } from 'react';

const AllComments = memo(() => {
  const { post_id } = usePost();

  const dispatch = useAppDispatch();
  const { comments } = useGetCommentsData();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComments = async() => {
    setLoading(true);

    const commentsApi = await getAllComments(post_id);

    commentsApi && dispatch(setComments(commentsApi));

    setLoading(false);
  }
  
  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h3 className='text-lg font-bold text-figmaBlack mb-3'>
        {comments.length === 0
          ? 'No comments'
          : comments.length === 1
          ? '1 comment'
          : `${comments.length} comments`}
      </h3>
      <div className='w-full flex flex-col gap-4'>
        {comments.map((c) => (
          <SingleComment key={c.comment_id} {...c} post_id={post_id} />
        ))}
      </div>
    </div>
  );
});

export default AllComments;
