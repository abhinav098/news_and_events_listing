<template>
  <div class="events">
    <h1>Events</h1>
    <div v-if="isLoading">
      Loading events..
    </div>
    <div v-else>
      <div class="row">
        <div class="col-6">
          <input type="text" id="events-search" v-model="searchTerm" placeholder="Search for events..." />
          <a v-on:click="searchEvents" class="btn">Search</a>
          <small v-on:click="clearSearch" class="btn">Clear</small>
        </div>
        <div class="col-6">
          Starting in:
          <select v-model="selectedMonth" id="month-filter">
            <option value="All">All</option>
            <option v-for="month in months" :value="month.value" v-bind:key="month.value">{{month.name}}</option>
          </select>

          Location:
          <select v-model="selectedLocation" id="location-filter">
            <option value="All">All</option>
            <option v-for="state in states" :value="state.value" v-bind:key="state.value">{{state.name}} ({{state.value}})</option>
          </select>
        </div>

      </div>
      <div v-if="filteredEvents.length">
        <div v-for="event in filteredEvents" v-bind:key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
      <div v-else>
        <br/><br/><br/>
        <h4>No results found for selected criteria!!</h4>
        <small v-on:click="clearSearch" class="btn">Clear all filters and search criteria</small>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { config } from '../../config';
  import { staticData } from '../data';
  import EventCard from './EventCard.vue';

  export default {
    name: 'Events',
    components: { EventCard },
    data() {
      return {
        searchTerm: '',
        months: staticData.months,
        states: staticData.states,
        selectedMonth: 'All',
        selectedLocation: 'All',
        searchedEvents: [],
        isLoading: true
      };
    },
    methods: {
      clearSearch() {
        this.searchTerm = "";
        this.selectedMonth  = "All";
        this.selectedLocation  = "All";
        this.searchEvents();
      },
      async searchEvents() {
        try {
          this.loading = true;
          const response = await axios.get(`${config.API_BASE_URL}/events?q=${encodeURI(this.searchTerm)}`);
          this.searchedEvents = response.data.data;
          this.isLoading = false
        } catch (e) {
          console.log(e);
          this.isLoading = false
        }
      }
    },
    computed: {
      filteredEvents: function() {
        let searchedEvents = this.searchedEvents;
        let month = this.selectedMonth;
        let location = this.selectedLocation;

        if(month === "All" && location === "All") {
          return searchedEvents;
        } else {
          let filteredByDate = searchedEvents.filter(function(event) {
            let start_date = new Date(event.start_date).toDateString();
            return  (month === 'All' || start_date.includes(month));
          });
          let filteredByLocation = filteredByDate.filter(function(event) {
            let event_location = event.location;
            return (location === 'All' || event_location.includes(location));
          });
          return filteredByDate && filteredByLocation;
        }
      }
    },
    async created() {
      this.searchEvents();
    },
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>
