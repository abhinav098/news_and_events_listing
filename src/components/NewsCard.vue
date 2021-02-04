<template>
  <div class="news-block">
    <div v-if="newsArticle">
      <div class="row">
        <div class="col-4">
          <img :src="newsArticle.image_url" @error="$event.target.src='https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.png'" />
        </div>
        <div class="col-8">
          <router-link class="news-link" :to="{ name: 'NewsShow', params: { id: newsArticle.id }}" exact>
            <h3>{{newsArticle.headline}}</h3>
          </router-link>
          <p>{{new Date(newsArticle.publication_date).toDateString()}} by {{newsArticle.author}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: ['newsArticle'],
}
</script>

<style scoped>
  .news-block {
    border-bottom: 1px #333 solid;
    padding: 1.6em 0;
    text-align: left;
  }
  img {
    width: 100%;
    height: 90%;
  }

  .news-link {
  text-decoration: none;
  color: #333;
  }

  .news-link:hover {
    text-decoration: none;
    color: grey;
  }
</style>
