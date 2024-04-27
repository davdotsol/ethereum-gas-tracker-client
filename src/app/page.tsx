import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import AnalyticsSummary from '@/components/AnalyticsSummary';
import GasPriceChart from '@/components/GasPriceChart';

export default function Home() {
  return (
    <div className="bg-light-gray-blue min-h-screen">
      <header className="bg-navy-blue text-white p-4 text-xl">
        Ethereum Gas Tracker Dashboard
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <GasPriceChart />
        <AnalyticsSummary />
      </div>
      <AdvancedAnalytics />
      <footer className="bg-dark-blue text-white p-4 text-center">
        © 2024 Ethereum Gas Tracker. All rights reserved.
      </footer>
    </div>
  );
}
