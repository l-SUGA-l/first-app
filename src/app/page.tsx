import Calendar from "@/app/components/Calendar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">カレンダー</h1>
      <Calendar />
    </main>
  );
}
