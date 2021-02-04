<template>
  <div class="news">
    <h3>News</h3>
    <div v-if="isLoading">
      Loading news..
    </div>
    <div v-else>
      <div class="form row">
        <div class="col-5">
          <input type="text" id="news-search" v-model="searchTerm" placeholder="Search for news..." />
          <a v-on:click="searchNews" class="btn ">Search</a>
          <small v-if="hideAllNews" v-on:click="clearSearch" class="btn ">Clear Search</small>
        </div>
        <div class="col-7">
          Published:
          <select name="cars" id="cars">
            <option value="volvo">Jan</option>
            <option value="saab">Feb</option>
          </select>

          Sort:
          <select name="cars" id="cars">
            <option value="desc">Most recent first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="hideAllNews">
      <div v-for="newsArticle in searchedNews" v-bind:key="newsArticle.id">
        <NewsCard :newsArticle="newsArticle" />
      </div>
    </div>
    <div v-else>
      <div v-for="newsArticle in news" v-bind:key="newsArticle.id">
        <NewsCard :newsArticle="newsArticle" />
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { config } from '../../config';
  import NewsCard from './NewsCard.vue';

  export default {
    name: 'News',
    components:{NewsCard},
    data() {
      return {
        news: null,
        searchTerm: null,
        searchedNews: null,
        hideAllNews: false,
        isLoading: true,
      };
    },
    methods: {
      clearSearch() {
        this.hideAllNews = false;
        this.searchTerm = "";
        this.searchedNews = null
      },
      async searchNews() {
        try {
          this.loading = true;
          const response = await axios.get(`${config.API_BASE_URL}/news/search?q=${encodeURI(this.searchTerm)}`);
          this.hideAllNews = true;
          this.searchedNews = response.data.data
          this.isLoading = false
        } catch (e) {
          console.log(e);
        }
      }
    },
    async created() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
      try {
          this.news = null;
          const response = await axios.get(config.API_BASE_URL + '/news')
          this.news = response.data.data
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
