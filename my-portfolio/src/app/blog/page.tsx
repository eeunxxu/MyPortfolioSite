import Link from 'next/link';

const BlogPage = () => {
  return (
    <div>
      <div>BlogPage</div>
      <div>
        <Link href="/blog/write">글쓰기로 이동</Link>
      </div>
      <div>글 목록 보는 페이지</div>
    </div>
  );
};

export default BlogPage;
