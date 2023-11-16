import { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  // Genres that will make up the pie slices
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  // Function to calculate data for each genre
  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return { name: genre, value: filteredEvents.length };
    });
    return data;
  };

  // Effect to update chart data when events change
  useEffect(() => {
    setData(getData());
  }, [events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie data={data} dataKey="value" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
