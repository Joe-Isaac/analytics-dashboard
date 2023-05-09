import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = () => {

  const options = {
    chart: {
      type: 'pie',
      toolbar: {
        show: true, // this will enable the options buttons,
        tools: {
          download: false // enable the download tool
        }
      }
    },
    series: [44, 55, 13],
    labels: ['Car', 'Person', 'Animal'],
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="pie" />
    </div>
  );
};

export default PieChart;
