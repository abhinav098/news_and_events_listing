<template>
  <div class="news-block">
    <router-link class="back-link" :to="{name: 'News'}" exact>
      Back to All News
    </router-link>
    <div v-if="isLoading">
      Loading Event..
    </div>
    <div v-else>
      <div v-if="newsArticle">
        <div class="row">
          <div class="col-12">
            <h1>{{newsArticle.headline}}</h1>
            <img :src="newsArticle.image_url" @error="$event.target.src='https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.png'" alt="Image" />
            <p>{{new Date(newsArticle.publication_date).toDateString()}} by {{newsArticle.author}}</p>
            <p>{{newsArticle.body}}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>News article not found </h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {config} from '../../config';

export default {
  name: 'NewsCard',
  data() {
    return {
      newsArticle: null,
    }
  },
  async created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
      try {
        this.news = null;
        const response = await axios.get(config.API_BASE_URL + '/news/' + this.$route.params.id);
        this.newsArticle = response.data.data
        this.isLoading = false
      } catch (e) {
        console.log(e);
        this.isLoading = false
      }
  }
}
</script>

<style scoped>
  .news-block {
    padding: 1.6em 0;
    text-align: left;
  }
  img {
    width: 80%;
    height: 70%;
    margin: 2em;
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
