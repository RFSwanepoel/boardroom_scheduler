<template>
  <v-container fluid full-width fullscreen pa-0 ma-0 app>
    <v-layout row wrap>
      <v-flex sm12 xs12 md4 lg6 ma-2>
          <v-card>
              <v-card-title class="pa-0 ma-0">
                  <v-toolbar dense class="elevation-0">
                      <v-toolbar-title >Some bar graph</v-toolbar-title>
                  </v-toolbar>
              </v-card-title>
              <bar-graph></bar-graph>
          </v-card>
      </v-flex>
      <v-flex sm12 xs12 md4 lg6 ma-2>
          <v-card>
              <v-card-title class="pa-0 ma-0">
                  <v-toolbar dense class="elevation-0">
                      <v-toolbar-title >Some graph</v-toolbar-title>
                  </v-toolbar>
              </v-card-title>
              <dougnut-chart :chart-data="datacollectionDougnut" />
          </v-card>
      </v-flex>
      <v-flex sm12 xs12 md4 lg6 ma-2>
          <v-card>
              <v-card-title class="pa-0 ma-0">
                  <v-toolbar dense class="elevation-0">
                      <v-toolbar-title >Some graph</v-toolbar-title>
                  </v-toolbar>
              </v-card-title>
              <line-chart options:options :chart-data="datacollectionLine"></line-chart>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import barGraph from '@/components/graps_and_charts/bar'
import lineChart from '@/components/graps_and_charts/line'
import dougnutChart from '@/components/graps_and_charts/dougnut'

const options = {
  responsive: true, 
  maintainAspectRatio: false, 
  animation: {
    animateRotate: false
  }
}

export default {
    components:{
        barGraph,
        lineChart,
        dougnutChart
    },
    data () {
        return {
            options
        }
    },
    mounted () {
    },
    computed:{
        datacollectionDougnut(){
            return{
                labels: ['stuff1', 'stuff2', 'stuff3', 'stuff4'],
                datasets: [
                    {
                        backgroundColor: ['pink', 'green', 'blue', 'red'],
                        data: [20,40,10,30],
                    }
                ]
            }
        },
        datacollectionLine(){
            let self = this;
            return {
                labels: [10,20,30,40,50,60],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: self.randomColor(),
                        data: [12,13,10,28,17,52]
                    },
                    {
                        label: 'Data One',
                        backgroundColor: self.randomColor(),
                        data: [10,11,8,26,15,50]
                    }
                ]
            }
        },
    },
    methods: {
        randomColor(){
            return '#'+(Math.random()*0xFFFFFFFF<<0).toString(16)
        }
    }
};
</script>

<style>
</style>
