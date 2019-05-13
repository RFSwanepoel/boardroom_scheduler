// CommitChart.js
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  props: ['chartData'],
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
      }
    }
  },
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
  }
}