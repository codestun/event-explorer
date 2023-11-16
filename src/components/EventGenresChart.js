import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie data={[]} dataKey="value" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
