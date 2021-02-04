<template>
  <div class="event-block">
    <div v-if="event">
      <router-link class="event-link" :to="{ name: 'EventShow', params: { id: event.id }}" exact>
        <h3>{{event.title}}</h3>
      </router-link>
      <p>
        {{new Date(event.start_date).toDateString()}} to
        {{new Date(event.end_date).toDateString()}} at
        {{new Date(event.time).toLocaleTimeString()  }}
      </p>
      <p>{{event.location}}</p>
    </div>
    <div v-else>
      <h3>No Events planned as of now.</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: ['event']

}
</script>

<style scoped>
  .event-block {
    text-align: left;
    padding: 1.6em;
    border-bottom: 1px solid #333;
  }
  .event-link {
    text-decoration: none;
    color: #333;
  }

  .event-link:hover {
    text-decoration: none;
    color: grey;
  }
</style>
