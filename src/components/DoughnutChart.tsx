'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({accounts}:DoughnutChartProps) => {
  const data =  {
    datasets:[
      {
        label:"Banks",
        data:[123,234,1000],
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'] 
      }
    ],
    labels:["bank1" , 'bank2' , "bank2"],
  }
  return (
    <Doughnut data={data} 
     options={{
      maintainAspectRatio: false ,
      plugins:{
        legend:{
          display:false
        }
      }
    }}
    />
  )
}

export default DoughnutChart;