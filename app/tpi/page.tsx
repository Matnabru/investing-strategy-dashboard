import Navbar from "@/components/Navbar";


const TPI = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-4xl font-bold uppercase">TPI - Trend Probability Indicator</h1>
        <p className="text-2xl mt-4 bg-gray-700 p-3 rounded-md">Work in Progress</p>
      </main>
    </div>
  );
};

export default TPI;
