# news_events_listing_app

There are two separate applications for this project. 
1. Admin application where admin users will log in to the platform and create news and events articles. (https://github.com/abhinav098/news_and_events)
2. Frontend application (Vue.js) for visitors that lists down all the news and events created by the backend. Visitors can search, filter, and sort the results based upon their search requirements. (https://github.com/abhinav098/news_and_events_listing)

Features: 

Admin application -
- User can to login to the admin app
- User can add, edit, delete events
- User can add, edit, delete news posts
- File upload for events on S3 and image upload for news on S3.

Frontend -
- Display news and events on the frontend
- Visitors can search by event name or news headline on their respective pages
- Show page for events and news resource
- News filter by months
- Visitors can sort news by date
- Visitors can filter events by month
- Event filter by location - Done

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
