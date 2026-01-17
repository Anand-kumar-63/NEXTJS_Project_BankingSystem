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
        data:accounts.map(item=>(item.currentBalance)),
        backgroundColor: ['#2f91fa','#0747b6', '#2265d8'] 
      }
    ],
    labels:accounts.map(item=>(item.name)),
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