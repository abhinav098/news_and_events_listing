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
          <a v-on:click="clearSearch" class="btn">Clear Search</a>
        </div>
        <div class="col-6">
          Month:
          <select name="cars" id="cars">
            <option value="volvo">Jan</option>
            <option value="saab">Feb</option>
          </select>

          Location:
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
        </div>

      </div>
      <div v-if="hideAllEvents">
        <div v-for="event in searchedEvents" v-bind:key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
      <div v-else>
        <div v-for="event in events" v-bind:key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { config } from '../../config';
  import EventCard from './EventCard.vue';

  export default {
    name: 'Events',
    components: { EventCard },
    data() {
      return {
        events: null,
        searchTerm: null,
        searchedEvents: null,
        hideAllEvents: false,
        months: ["January","February","March","April","May","June","July",
            "August","September","October","November","December"],
        options: [
            {text: "California", value:"CA"},
            {text: "New York", value: "NY"},
        ],
        isLoading: true
      };
    },
    methods: {
      clearSearch() {
        this.hideAllEvents = false;
        this.searchTerm = "";
        this.searchedEvents = null
      },
      async searchEvents() {
        try {
          this.loading = true;
          const response = await axios.get(`${config.API_BASE_URL}/events/search?q=${encodeURI(this.searchTerm)}`);
          this.hideAllEvents = true;
          this.searchedEvents = response.data.data
          this.isLoading = false
        } catch (e) {
          console.log(e);
        }
      }
    },
    async created() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
      try {
          const response = await axios.get(config.API_BASE_URL + '/events')
          this.events = response.data.data
          this.isLoading = false
      } catch (e) {
        console.log(e);
      }
    },
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>
