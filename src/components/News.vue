<template>
  <div class="news">
    <h1>News</h1>
    <div v-if="isLoading">
      Loading news..
    </div>
    <div v-else>
      <div class="form row">
        <div class="col-6">
          <label for="news-search" hidden>
            Search for news
          </label>
          <input type="text" id="news-search" v-model="searchTerm" placeholder="Search for news..." />
          <a v-on:click="searchNews" class="btn ">Search</a>
          <small v-on:click="clearSearch" class="btn ">Clear search & filter</small>
        </div>
        <div class="col-6">
          Published:
          <select v-model="selectedMonth" id="filter">
            <option value="All">All</option>
            <option v-for="month in months" :value="month.value" v-bind:key="month.value">{{month.name}}</option>
          </select>

          Sort:
          <select v-model="selectedSort" name="sort" id="sort-news">
            <option value="desc">Most recent first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="filteredNews.length">
      <div v-for="newsArticle in filteredNews" v-bind:key="newsArticle.id">
        <NewsCard :newsArticle="newsArticle" />
      </div>
    </div>
    <div v-else>
      <br/><br/><br/>
      <h4>No results found for selected criteria!!</h4>
      <small v-on:click="clearSearch" class="btn">Clear all filters and search criteria</small>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { config } from '../../config';
  import NewsCard from './NewsCard.vue';
  import { staticData } from '../data.js';

  export default {
    name: 'News',
    components:{NewsCard},
    data() {
      return {
        searchTerm: '',
        searchedNews: [],
        selectedMonth: 'All',
        months: staticData.months,
        selectedSort: 'desc',
        isLoading: true,
      };
    },
    created() {
      this.searchNews();
    },
    computed: {
      filteredNews: function() {
        let _this = this;
        let month = this.selectedMonth;
        let sort = this.selectedSort;
        let filtered;
        if(month === "All") {
          filtered = _this.searchedNews;
        } else {
          filtered = _this.searchedNews.filter(function(news) {
            let publication_date = new Date(news.publication_date).toDateString();
            return  (publication_date.includes(month));
          });
        }
        let sorted = filtered.sort(function(a, b) {
          if (sort === 'desc') {
            return a.publication_date < b.publication_date ? 1 : -1;
          } else {
            return a.publication_date > b.publication_date ? 1 : -1;
          }
        })
        return filtered && sorted;
      }
    },
    methods: {
      clearSearch() {
        this.searchTerm = "";
        this.selectedMonth = 'All';
        this.selectedSort = 'desc';
        this.searchNews();
      },
      async searchNews() {
        try {
          this.loading = true;
          const response = await axios.get(`${config.API_BASE_URL}/news?q=${encodeURI(this.searchTerm)}`);
          this.searchedNews = response.data.data
          this.isLoading = false
        } catch (e) {
          console.log(e);
        }
      }
    },
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>
