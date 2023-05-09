import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


function SplineChart({data}){
  const [localData, setLocalData] = useState([]);
  const [localLabel, setLocalLabel] = useState([])

  useEffect(()=>{
    if(data){
      console.log("The data ", data)
      // data?.group.map(x => {
      //   setLocalLabel(y => [...y, Object.keys(x)])
      //   setLocalData(z => [...z, Object.values(x)])
      // })
      data?.map(y => {
        for(let value in y?.group){
          console.log("This is key ", value)
          setLocalLabel(w => [...w, value])
        }
      })

      console.log("Our local vars ", localData);
      console.log("Our label ", localLabel);
    }
  }, [data])
  const chartData = {
    options: {
      chart: {
        id: 'spline-chart',
        toolbar: {
          show: true, // this will enable the options buttons,
          tools: {
            download: false // enable the download tool
          }
        }
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
        categories: localLabel
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
        name: 'Our data',
        data: localData
      },
    ],
    
    
  };

  return (
    <>
    {localLabel && <ReactApexChart options={chartData.options} series={chartData.series} type="line" />}
    </>
  );
};

export default SplineChart;  