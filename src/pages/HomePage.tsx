import WritePost from '../features/posts/WritePost';
import HeadingPrimary from '../ui/HeadingPrimary';
import PostsFeed from '../features/posts/PostsFeed';
import Sidebar from '../ui/Sidebar';
import UserDropDown from '../features/user/UserDropDown';

const HomePage = () => {
  
  return (
    <div className='flex flex-col md:items:center md:justify-center lg:grid grid-cols-[300px,1fr,300px] max-w-[1366px] mx-auto'>
      <Sidebar />
      <HeadingPrimary />
      <section className='md:p-6 flex flex-col gap-6 col-start-2 border-l border-r border-figmaGrayLight '>
        <WritePost />
        <PostsFeed />
      </section>

      <UserDropDown />
    </div>
  );
};

export default HomePage;
