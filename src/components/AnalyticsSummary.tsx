export default function AnalyticsSummary() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-sky-blue font-bold text-lg mb-2">
        Gas Price Analytics
      </h2>
      <ul>
        <li>
          Average Gas Price: <strong>100 Gwei</strong>
        </li>
        <li>
          Median Gas Price: <strong>95 Gwei</strong>
        </li>
        <li>
          Maximum Gas Price Today: <strong>150 Gwei</strong>
        </li>
        {/* More analytics points can be added here */}
      </ul>
    </div>
  );
}
