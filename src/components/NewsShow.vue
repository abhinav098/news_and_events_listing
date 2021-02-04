<template>
  <div class="news-block">
    <div v-if="newsArticle">
      <div class="row">
        <div class="col-12">
          <h3>{{newsArticle.headline}}</h3>
          <img :src="newsArticle.image_url" @error="$event.target.src='https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.png'" />
          <p>{{new Date(newsArticle.publication_date).toDateString()}} by {{newsArticle.author}}</p>
          <p>{{newsArticle.body}}</p>
        </div>
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
</style>
