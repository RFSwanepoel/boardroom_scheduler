<template>
  <v-layout column>
    <v-expansion-panel elevation-0>
      <v-expansion-panel-content v-for="(room, i) in value" :key="`room${i}`">
        <template v-slot:header>
          <v-badge left overlap :color="room.color">
            <template v-slot:badge>
              <span>{{room.seating}}</span>
            </template>
            <v-icon large>fa-chair</v-icon>
          </v-badge>
        </template>
        <v-card :color="room.color">
          <v-card-text>
            <v-list dense class="transparent">
              <v-list-tile>Seats: {{room.seating}} people</v-list-tile>
              <template v-for="(has, facility, i) in room.facilities">
                <v-list-tile :key="`${i}`">
                  {{facility}}
                  <v-list-tile-avatar>
                    <v-icon small v-if="has">fa-check</v-icon>
                    <v-icon small v-else>fa-times</v-icon>
                  </v-list-tile-avatar>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {};
  }
};
</script>

<style>
</style>
