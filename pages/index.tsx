import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Build Professional Email Templates</h1>
      <p className="text-lg text-gray-600 mb-8">
        Responsive, customizable, and exportable in HTML
      </p>
      <Link
        href="/builder"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Start Creating
      </Link>
    </div>
  );
}
