import DraftClientWrapper from '../ui/DraftClientWrapper';

const PostForm = () => {
  return (
    <div>
      <h1 className="text-2xl">
        <input type="text" placeholder="제목" />
      </h1>
      <DraftClientWrapper />
    </div>
  );
};

export default PostForm;
