<template>
  <div class="event-block">
    <div v-if="isLoading">
      Loading Event..
    </div>
    <div v-else>
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
        <div v-if="event.file_url.length">
          <a class="btn btn-secondary" :href="event.file_url" target="_blank" download>
            Download Attachment
          </a>
        </div>
      </div>
      <div v-else>
        <h3>Not Found</h3>
      </div>
      <p>
        <br>
        <router-link class="back-link" :to="{name: 'Events'}" exact>
          Back to Events
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {config} from '../../config';

export default {
  name: 'EventCard',
  data() {
    return {
      event: null,
      errors: [],
      isLoading: true,
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
      this.isLoading = false
    }
  }

}
</script>

<style scoped>
  .event-block {
    text-align: left;
    padding: 1.6em;
  }

  .back-link {
  text-decoration: none;
  color: #333;
  }

  .back-link:hover {
    text-decoration: none;
    color: grey;
  }
</style>
