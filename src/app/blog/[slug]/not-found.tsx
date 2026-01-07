import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#EF4444] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
        <p className="text-xl text-white/90 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link 
          href="/blog"
          className="inline-block px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}

