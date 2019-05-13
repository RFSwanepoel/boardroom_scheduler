<template>
  <v-container fill-height fluid fullscreen ma-0 pa-0 app >
    <v-dialog v-model="showEventCreationDialog" :persistent="true" max-width="600">
      <v-card>
        <v-card-title v-if="selectedEvent.isNew">Create new booking</v-card-title>
        <v-card-title v-else>Edit booking</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation >
          <v-card-text>
            <v-text-field prepend-icon="fa-edit" required :rules="rules.title" :counter="15" v-model="selectedEvent.title" label="Booking Title"/>
            <v-text-field prepend-icon="fa-edit" required :rules="rules.content" v-model="selectedEvent.content" label="Booking Description"/>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg5>
                <v-select
                  dense
                  prepend-icon="fa-chair"
                  :items="rooms"
                  item-text="name"
                  item-value="class"
                  label="Select a room"
                  required
                  :rules="[v => !!v || 'Room is required']"
                  v-model="selectedEvent.class"
                  @change="selectedEvent.classes = [$event], selectedEvent.class = $event" >

                  <template v-slot:selection="data">
                    <v-chip :color="data.item.color" :selected="data.selected" small>
                      <v-avatar>
                        <v-icon small>fa-{{data.item.icon}}</v-icon>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-avatar :color="data.item.color" size="25" pa-0 ma-0>
                        <v-icon small>fa-{{data.item.icon}}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title ></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm5 md5 lg5>
                <v-menu
                  v-model="menus.date"
                  :close-on-content-click="false"
                  :nudge-right="10"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="250px" >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedEvent.startDate"
                      label="Select Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      required
                      :rules="rules.date"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                    :min="todayFormatted"
                    v-model="selectedEvent.startDate"
                    @input="
                      menus.date = false, 
                      selectedEvent.endDate = selectedEvent.startDate.trim(),
                      selectedEvent.start = `${selectedEvent.startDate.trim()} ${selectedEvent.startTime.trim()}`
                      selectedEvent.end = `${selectedEvent.startDate.trim()} ${selectedEvent.endTime.trim()}`
                    ">
                    </v-date-picker>
                  </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg5>
                <v-menu
                  ref="menu_startTime"
                  v-model="menus.startTime"
                  :close-on-content-click="false"
                  :nudge-right="10"
                  :return-value.sync="selectedEvent.startTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="250px"
                  min-width="250px" >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedEvent.startTime"
                      label="Start Time"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                      required
                      :rules="rules.starTime"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-if="menus.startTime"
                    v-model="selectedEvent.startTime"
                    full-width
                    @click:minute="$refs.menu_startTime.save(selectedEvent.startTime)"
                    @input="
                    selectedEvent.start = `${selectedEvent.startDate} ${selectedEvent.startTime}`, 
                    selectedEvent.startTimeMinutes = getMinutes(selectedEvent.startTime)
                    ">
                    </v-time-picker>
                </v-menu>
              </v-flex  >
              <v-spacer></v-spacer>
              <v-flex xs12 sm5 md5 lg5>
                <v-menu
                  ref="menu_endTime"
                  v-model="menus.endTime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="selectedEvent.endTime"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="250px"
                  min-width="250px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedEvent.endTime"
                      label="Picker in menu"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                      required
                      :rules="rules.endTime"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    format="24hr"
                    v-if="menus.endTime"
                    v-model="selectedEvent.endTime"
                    full-width
                    @click:minute="$refs.menu_endTime.save(selectedEvent.endTime)"
                    @input="selectedEvent.end = `${selectedEvent.startDate.trim()} ${selectedEvent.endTime.trim()}`, selectedEvent.endTimeMinutes = getMinutes(selectedEvent.endTime.trim())"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="headerColor" flat @click="cancelEventCreation()">Cancel</v-btn>
            <v-btn color="headerColor" :disabled="!valid" v-if="selectedEvent.isNew" @click="validate()">Save</v-btn>
            <v-btn color="headerColor" :disabled="!valid" v-else @click="validate()">Update</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-layout row wrap>
      <!-- RIGHT PANEL -->
      <v-flex xs12 sm12 md8 lg9 px-0  elevation-5>
        <vue-cal 
          ref="vuecal_main"
          style="height: 90vh;"
          small
          clickToNavigate
          :time-step="10"
          :time-cell-height="18"
          :selected-date="selectedDate"
          default-view="month"
          :disable-views="['years']"
          :todayButton="true"
          :events="bookings"
          events-on-month-view="short"
          editable-events
          class="vuecal--custom-theme"
          :no-event-overlaps="false"
          :on-event-create="openEventEditor"
          @event-delete="logEvents('event-delete', $event)"
          @event-duration-change="updateEvent($event)"
        >
        <!-- LEFT TIME LINE -->
            <div slot="event-renderer" slot-scope="{ event, view }" :style="{'background-color':event.color}" v-if="view === 'day'">
              <div class="vuecal__event-title">
                <v-toolbar dense class="transparent elevation-0">
                  <v-toolbar-title v-html="event.title"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn right flat icon> <v-icon small @click.stop="openEventEditor(event)">fa-edit</v-icon></v-btn>
                    <v-btn right flat icon> <v-icon small @click.stop="removeEvent(event)">fa-trash</v-icon></v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-layout column pa-5 style="margin:auto">
                  <v-flex><v-icon>fa-{{ event.icon }}</v-icon></v-flex>
                  <v-flex v-html="event.content" caption></v-flex>
                </v-layout>
              </div>
            </div>
            <div slot="event-renderer" slot-scope="{ event, view }" :style="{'background-color':event.color}" v-else>
              <v-container fluid centered v-if="view === 'day'">
                  <div class="vuecal__event-title" >
                    <v-layout row >
                        <v-btn right flat icon small ma-0 pa-0 > <v-icon small @click.stop="openEventEditor(event)">fa-edit</v-icon></v-btn>
                        <v-btn right flat icon small ma-0 pa-0 > <v-icon small @click.stop="removeEvent(event)">fa-trash</v-icon></v-btn>
                    </v-layout>
                  </div>
                </v-container>
              <v-container fluid centered v-if="view === 'week'">
                  <div class="vuecal__event-title" >
                    <v-layout column justify-center align-center >
                      <v-flex><v-btn flat icon small ma-0 pa-0 > <v-icon small @click.stop="openEventEditor(event)">fa-edit</v-icon></v-btn></v-flex>
                      <v-flex><v-btn flat icon small ma-0 pa-0 > <v-icon small @click.stop="removeEvent(event)">fa-trash</v-icon></v-btn></v-flex>
                      <v-flex><v-btn flat icon small ma-0 pa-0 > <v-icon small @click.stop="showInfo(event)">fa-info</v-icon></v-btn></v-flex>
                    </v-layout>
                  </div>
                </v-container>
            </div>
          <div :class="{ line: true, hours: !minutes }" slot="time-cell" slot-scope="{ hours, minutes }">
            <strong v-if="!minutes" style="font-size: 12px" v-html="`${(hours < 10)? '0':''}${hours}:00`"></strong>
            <span v-else style="font-size: 10px" v-html="`${(hours < 10)? '0':''}${ hours }:${ minutes }`"></span>
          </div>  
          <!-- CUSTOM CELLS -->
          <div slot="cell-content" slot-scope="{ cell, view, events, goNarrower }">
            <span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'month'" @click="goNarrower">
                <span class="date">{{general.createCustomDateFormat({dateToFormat: new Date(cell.endDate), formatString: `#DD#`})}}</span>
                <template>
                  <v-layout column v-if="events.length">
                    <span v-for="(evt) in events" :key="`evt${evt.id}`" class="event_title" :class="`${evt.class}`"> {{evt.title}} </span>
                  </v-layout>
                  <span v-else class="vuecal__no-event">No bookings today</span>
                </template>
            </span>
            <span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower"></span>
            <span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'year'" @click="goNarrower">
              <span class="date">{{general.createCustomDateFormat({dateToFormat: new Date(cell.endDate), formatString: `#MMMM#`})}}</span>
            </span>
            <span class="vuecal__cell-events-count year-view" v-if="view.id === 'year' && events.length">{{ events.length }} Bookings in {{general.createCustomDateFormat({dateToFormat: new Date(cell.endDate), formatString: `#MMMM#`})}}</span>
            <span class="vuecal__no-event" v-if="['year'].includes(view.id) && !events.length">No bookings this month</span>
          </div>
        </vue-cal>
      </v-flex>
      <!-- LEFT PANEL -->
      <v-flex xs12 sm12 md4 lg3 px-0 elevation-0 style="overflow:auto; height: 90vh;">
        <v-toolbar dense>
          <v-toolbar-title>Board Roooms</v-toolbar-title>
        </v-toolbar>
        <!-- <vue-cal 
          clickToNavigate
          ref="vuecal_small"
          small
          :time="false"
          default-view="month"
          :disable-views="['week', 'day']"
          :selected-date="selectedDate"
          :events="bookings"
          style="height: 300px"
          class="vuecal--custom-theme vuecal--rounded-theme"
          @cell-focus="selectedDate = $event"
        >
        </vue-cal> -->
        <v-autocomplete
          color="inputColor"
          prepend-inner-icon="fa-filter"
          v-model="selectedRooms"
          :disabled="isUpdating"
          :items="rooms"
          hide-details
          chips
          no-data-text="All filters selected"
          label="Filter Rooms"
          item-text="name"
          item-value="id"
          multiple
          clearable
          hide-selected
          small-chips
        > 
        
          <template v-slot:selection="data">
            <v-chip
              :selected="data.selected"
              close
              small
              class="chip--select-multi"
              :color="data.item.color"
              @input="removeRoomFilter(data.item.id)"
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content dense v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar :color="data.item.color" size="25" pa-0 ma-0>
                <v-icon small>fa-{{data.item.icon}}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title ></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
        <room-info-display v-model="rooms"></room-info-display>
      </v-flex>
    </v-layout>
    <v-footer fixed>
      <v-btn color="buttonColor" block @click="btnCreateEvent()">Create Booking</v-btn>
    </v-footer>
  </v-container>
</template>

<script>
import VueCal from "vue-cal";
import "@/customStyles/vuecal.css";
import config from "@/config"
import general from "@/general/general"
import roomInfoDisplay from "@/components/roomInfoDisplay"
import {mapGetters, mapActions} from "vuex"

export default {
  components: { VueCal, roomInfoDisplay },
  data() {
    return {
      general,
      menus: {
        date: false,
        endTime: false,
        startTime:false
      },
      rooms: config.boardrooms,
      selectedEvent: {},
      showEventCreationDialog: false,
      eventsCssClasses: config.boardrooms.map(o=> o.class),
      editorBooking: {},
      isUpdating: false,
      selectedRooms: [],
      selectedDate: new Date(),
      todayFormatted: general.createCustomDateFormat({dateToFormat: new Date(), formatString: `#YYYY#-#MM#-#DD#`}),
      valid: true,
      rules:{
        title: [
          v => !!v || 'Title is required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters'
        ],
        content: [
          v => !!v || 'Description is required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters'
        ],
        boardroom:[v => !!v || 'Room is required'],
        date: [v => !!v || 'Date is required'],
        startTime: [
          v => !!v || 'Time is required',
          // v => new Date(v) < new Date(this.selectedEvent.end) || 'Start date cannot be less than end time'
        ],
        endTime: [
          v => !!v || 'Time is required',
          // v => new Date(v) < new Date(this.selectedEvent.start) || 'End date cannot be greater than start time'
        ],
      }
    };
  },
  computed: {
    ...mapGetters({
      events: 'bookingsMod/getAllBookings'
    }),
    bookings() {
      let self = this;
      let e = self.$store.getters['bookingsMod/getAllBookings'];
      let evts = self.events.filter(o=> self.selectedRooms.includes(o.roomId));
      return evts;
    }
  },
  methods:{
    ...mapActions({
      getBookings: 'bookingsMod/getBookings',
      addBooking: 'bookingsMod/addBooking',
      removeBooking: 'bookingsMod/removeBooking',
      updateBooking: 'bookingsMod/updateBooking'
    }),
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    validate () {
      let self = this;
      if (self.$refs.form.validate()) {
        self.snackbar = true
        if(self.selectedEvent.isNew){
          self.saveEvent(self.selectedEvent)
        }
        else{
          self.updateEvent(self.selectedEvent)
        }

        self.closeCreationDialog()
        self.resetValidation()
      }
    },
    getMinutes(time){
      let hr = parseInt(time.split(':')[0]);
      let min = parseInt(time.split(':')[1]);
      return (hr*60)+min;
    },
    logEvents(type, e){
      console.log('EVENT: ', type, e);
    },
    btnCreateEvent(){
      let date = this.general.createCustomDateFormat({dateToFormat: new Date(this.selectedDate), formatString: `#YYYY#-#MM#-#DD#`});
      console.log('PROGRAMATICALLY CREATING EVENT: ', this.selectedDate);
      this.$refs.vuecal_main.createEvent( date, 0, 
        { 
          title: '',
          icon: 'chair',
          content: '',
          class: '',
          roomId: '',
          user: 'Timmy'
        }
      )
    },
    openEventEditor(event, deleteEventFunction) {
      let self = this;
      event.isNew = (event.id)? false:true;
      self.selectedEvent = event;
      self.showEventCreationDialog = true
      self.deleteEventFunction = deleteEventFunction
      self.resetValidation();
      return event
    },
    saveEvent(e){
     let newBooking = {
        start: e.start,
        end: e.end,
        title: e.title,
        icon: 'chair',
        content: e.content,
        class: e.classes[0],
        id: new Date().getTime(),
        roomId: this.rooms.find(o=> o.class === e.classes[0]).id,
        user: 'Timmy'
      };
      this.addBooking(newBooking);
    },
    updateEvent(e){
      let booking = {
        start: e.start,
        end: e.end,
        title: e.title,
        icon: 'chair',
        content: e.content,
        class: e.class,
        id: e.id,
        roomId: e.roomId,
        user: 'Timmy'
      };
      console.log('Update', booking, e);
      this.updateBooking(booking);
    },
    removeEvent(e){
      let self = this;
      let data = {
          title: 'Caution!',
          message:  `You are about to delete ${e.title}`,
          type: 'info',
          buttons: {
            action: {
              title: 'Delete', 
              method: () => {self.removeBooking(e.id);}
            },
            cancel: {
                title: 'Cancell',
                method: () => {
                }
            }
          }
      }
      self.$store.dispatch('guiMod/setModalContent', data);
    },
    showInfo(e){
      let self = this;
      let data = {
          title: `${e.title} Information`,
          message:  `<p>${e.content}</p>`,
          type: 'info',
          buttons: {
            cancel: {
                title: 'OK',
                method: () => {
                }
            }
          }
      }
      self.$store.dispatch('guiMod/setModalContent', data);
    },
    cancelEventCreation () {
      this.closeCreationDialog()
      this.deleteEventFunction()
    },
    closeCreationDialog () {
      this.showEventCreationDialog = false
      this.selectedEvent = {}
      console.log('PUSH event');
      //add to selectedEvent to event arr
    },
    removeRoomFilter(id){
      this.selectedRooms = this.selectedRooms.filter((o)=> o !== id);
    }
  },
  mounted(){
    this.selectedRooms = [...this.rooms.map((o)=>o.id)];
    this.getBookings();
  }
};
</script>
<style>
.vuecal__event.green_room,
.vuecal__cell-date.month .event_title.green_room {
  background-color: rgba(3, 192, 60,0.8); 
  color: #fff;
}
.vuecal__event.red_room,
.vuecal__cell-date.month .event_title.red_room {
  background-color: rgba(194, 59, 35, 0.8);
  color: #fff;
  }
.vuecal__event.blue_room,
.vuecal__cell-date.month .event_title.blue_room {
  background-color: rgba(87, 154, 190,0.8);
  color: #fff;
}

</style>

