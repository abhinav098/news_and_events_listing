<template>
  <div class="event-block">
    <div v-if="event">
      <h3>{{event.title}}</h3>
      <p>
        {{new Date(event.start_date).toDateString()}} to
        {{new Date(event.end_date).toDateString()}} at
        {{new Date(event.time).toLocaleTimeString()  }}
      </p>

      <p>
        {{event.description}}
      </p>
      <p>{{event.location}}</p>
    </div>
    <a v-if="event.file_path" class="btn btn-secondary" :href="event.file_path" target="_blank" download>
      Download Attachment
    </a>
  </div>
</template>

<script>
import axios from 'axios';
import {config} from '../../config';

export default {
  name: 'EventCard',
  data() {
    return {
      event: null
    }
  },

  async created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
    try {
      this.news = null;
      const response = await axios.get(config.API_BASE_URL + '/events/' + this.$route.params.id);
      this.event = response.data.data
      this.isLoading = false
    } catch (e) {
      console.log(e);
    }
  }

}
</script>

<style scoped>
  .event-block {
    text-align: left;
    padding: 1.6em;
  }
</style>
