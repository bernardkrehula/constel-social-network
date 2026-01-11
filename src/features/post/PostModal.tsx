import getSinglePost from '../../api/getSinglePost';
import Spinner from '../../ui/Spinner';
import { usePost } from '../posts/PostContext';
import UserInfo from '../../ui/UserInfo';
import PostDate from '../../ui/PostDate';
import { useEffect, useState } from 'react';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import WriteComment from '../comments/WriteComment';
import AllComments from '../comments/AllComments';
import AudioPlayer from '../audio/AudioPlayer';
import PostImage from '../../ui/PostImage';
import { PostType } from '../../types/postType';
import { PostUserType } from '../../types/postUserType';

const PostModal = ({user}: {user?: PostUserType}) => {
  if(!user) return <Spinner />
  
  const { post_id } = usePost();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({} as PostType);
  const { username, full_name, picture } = user;

  useEffect(() => {
    
    const getPost = async () => {
      try {
        setLoading(true);
        const post = await getSinglePost(post_id);
        setPost(post as PostType);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getPost();
  }, []);

  if (!post && !loading)
    return <Spinner />;

  return (
    <article className='py-4 px-6 max-w-2xl sma:max-h-[600px] smb:max-h-[550px] md:max-h-[700px] min-h-[360px] lg:min-w-[620px]  smb:bg-white md:bg-figmaGray shadow-lg  rounded-lg overflow-y-scroll break-words'>
      <UserInfo
        username={username}
        full_name={full_name}
        picture={picture}
        fullNameClassname={post.image ? '' : 'mb-3'}
      />
      {post.image && (
        <PostImage
          src={post.image}
          alt="post's user image"
          containerSize='max-h-[280px]'
        />
      )}
      <PostDate created_at={post.created_at} />
      <p className='sma:text-[0.85rem]  smb:text-[0.87rem]  md:text-[0.95rem] md:leading-[1.45rem] text-figmaBlack mb-3'>
        {post.text}
      </p>

      {post.audio && <AudioPlayer audioSrc={post.audio} />}

      <WriteComment post_id={post.post_id} />
      <div className='flex gap-2 mb-4'>
        <LikeButton />
        <CommentButton type='dummy' />
      </div>
      <AllComments />
    </article>
  );
};

export default PostModal;
