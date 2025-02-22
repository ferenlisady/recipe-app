import Navbar from '@/app/ui/navbar';
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full bg-gray-800 text-white">
        <Navbar />
      </div>
      <div className="flex-grow p-6 md:p-12 bg-gray-50 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
