import Chart from 'chart.js/auto'
import { days } from './getDay.js'



const data = {
    labels: Object.values(days),
    datasets: [
      {
        label: 'Temperaturas',
        data: [2,3,4,1,23,23],
        borderColor: 'rgb(0, 125, 255)',
      },
    ]
  }
  
  
  const chart_config = {
    type: 'line',
    data : data,
    options: {
        responsive: true,
        plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Pronóstico 5 días',
          color:'#fff'
        }
      },
      scales: {
        y: {
          ticks: { color: 'white', beginAtZero: true }
        },
        x: {
          ticks: { color: 'white', beginAtZero: true }
        }
      }
    },
  }

const table = new Chart(
  document.getElementById('chart'),
  chart_config,
);
