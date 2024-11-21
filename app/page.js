import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <img src="/images/Pourperfectdog.png" alt="PourPerfect Dog" className="mb-4 size-52" />
      <h1 className="text-4xl font-handwriting font-bold text-yellow-400 mb-6">Welcome to PourPerfect</h1>
      <Link href="/menuapp">
        <p className="text-lg text-blue-500 hover:underline">Start Creating Menu!</p>
      </Link>
    </div>
  );
}