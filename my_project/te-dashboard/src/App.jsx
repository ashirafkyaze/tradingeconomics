import { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [country, setCountry] = useState("united states");
  const [indicator, setIndicator] = useState("gdp");
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/data?country=${country}&indicator=${indicator}`
    );

    const labels = res.data.map(d => d.Date);
    const values = res.data.map(d => d.Value);

    setChartData({
      labels,
      datasets: [
        {
          label: `${country} - ${indicator}`,
          data: values,
        }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">
          Economic Dashboard
        </h1>

        <div className="flex gap-4 mb-6">
          <input
            className="border p-2 rounded w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />

          <input
            className="border p-2 rounded w-full"
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            placeholder="Indicator"
          />

          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Load
          </button>
        </div>

        {chartData && <Line data={chartData} />}
      </div>
    </div>
  );
}

export default App;
