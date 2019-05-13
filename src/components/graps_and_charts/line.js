import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  props: ['chartData'],
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        gridLines:{
          borderDash:[5,10]
        },
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
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}