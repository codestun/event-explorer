import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  // Effect to update chart data when allLocations or events change
  useEffect(() => {
    const getData = () => {
      return allLocations.map((location) => {
        const count = events.filter((event) => event.location === location).length
        const city = location.split(/, | - /)[0]
        return { city, count };
      });
    };

    setData(getData());
  }, [allLocations, events]);

  // Custom color for the scatter plot
  const scatterColor = '#2e4369';

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category" dataKey="city" name="City"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Events per city" data={data} fill={scatterColor} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityEventsChart;
