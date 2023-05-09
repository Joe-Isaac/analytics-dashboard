import ReactApexChart from 'react-apexcharts';
import '../../App.css'
const chartData = {
    options: {
      chart: {
        id: 'bar-graph',
        toolbar: {
          show: true, // this will enable the options buttons,
          tools: {
            download: false // enable the download tool
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "65%",
          borderRadius: 5,
        },
      },
      legend: {
        labels: {
          enabled: false,
          colors: ['#ffffff'], // set the color of the labels to white
        },
      },
      stroke: {
        show: true,
        width: 3,
        curve: 'smooth'
      },
      grid: {
        column: true,
        borderColor: "#ccc",
        strokeDashArray: 1.5,
      },
      xaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: 
              "#fff",
          },
        },
        categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
  
      tooltip: {
        theme: 'dark'
      },
    },
    series: [
      {
        name: 'Car',
        data: [30, 40, 25, 50, 49, 21, 70, 51, 45, 40, 60, 40, 25, 50, 49, 21, 70, 51, 45, 40, 60, 40]
      },
      {
        name: 'Person',
        data: [50, 40, 35, 60, 79, 61,28, 51, 45, 40, 60, 40, 25, 50, 49, 21, 70, 51, 45, 40, 60, 40]
      },
      {
        name: 'Animal',
        data: [80, 80, 95, 90, 79, 91, 70, 81, 75, 60, 50, 50, 25, 50, 49, 21, 70, 51, 45, 40, 60, 40]
      }
    ],
    
    
  };

function SplineChart(){
  return (
    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" />
  );
};

export default SplineChart;  