import Link from 'next/link';

const TopBar = () => {
  return (
    <div className="w-full h-14 bg-amber-300 px-4">
      <div className="h-full w-full flex items-center justify-between">
        <Link href="/blog">Blog</Link>
      </div>
    </div>
  );
};

export default TopBar;
