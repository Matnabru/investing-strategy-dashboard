import Navbar from '../components/Navbar';
import StrategySection from '../components/StrategySection';

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StrategySection title="SDCA - Strategic Dollar Cost Average" imageSrc="/sdca-image.png" />
          <StrategySection title="TPI - Trend Probability Indicator" imageSrc="/tpi-image.png" description="Work in Progress" />
        </div>
      </main>
    </div>
  );
};

export default Home;
