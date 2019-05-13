<template>
  <v-container fluid full-width fullscreen pa-0 ma-0 app >
      <v-layout align-space-around justify-start row wrap fill-height >
          <template v-for="(definition, i) in reportDefinitions">
              <v-flex :class="getFlexSizing(definition.size)"  :key="`report_element_${i}`" >
                  <v-card>
                    <v-card-title class="pa-0 ma-0">
                        <v-toolbar dense class="elevation-0">
                            <v-toolbar-title>{{definition.title}}</v-toolbar-title>
                        </v-toolbar>
                    </v-card-title>
                    <v-card-text>
                        <bar-graph v-if="definition.displayType === 'bar_graph'" style="position: relative; max-height: 600px;"  :chart-data="chartData[definition.matchKey]" />
                        <dougnut-chart v-if="definition.displayType === 'dougnut'" style="position: relative; max-height: 600px;"  :chart-data="chartData[definition.matchKey]" />
                        <line-chart v-if="definition.displayType === 'line_chart'" style="position: relative; max-height: 600px;"  :chart-data="chartData[definition.matchKey]" />
                        <v-subheader>{{definition.description}}</v-subheader>
                    </v-card-text>
                </v-card>
              </v-flex>
          </template>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import config from "@/config"
import barGraph from '@/components/graps_and_charts/bar'
import lineChart from '@/components/graps_and_charts/line'
import dougnutChart from '@/components/graps_and_charts/dougnut'

export default {
    components:{ barGraph, lineChart, dougnutChart },
    data () {
        return {}
    },
    computed:{
        ...mapGetters({
            reportDefinitions: 'reportingMod/getReportDefinitions',
            reportData: 'reportingMod/getAllReportData',
        }),
        chartData(){
            return JSON.parse(JSON.stringify(this.reportData))
        }
    },
    methods: {
        ...mapActions({
            getReportData: 'reportingMod/getReportData',
            getReportDefinitions: 'reportingMod/getReportDefinitions'
        }),
        getFlexSizing(size){
            if(size === 1){ return 'xs12 sm3 md3 lg3' }
            if(size === 2){ return 'xs12 sm4 md4 lg4' }
            if(size === 3){ return 'xs12 sm6 md6 lg6' }
            if(size === 4){ return 'xs12 sm12 md12 lg12' }
        }
    },
    mounted(){
        let self = this;
        self.getReportData();
        self.getReportDefinitions();
    }
};
</script>

<style>
</style>
