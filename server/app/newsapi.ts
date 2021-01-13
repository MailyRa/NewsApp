import NewsAPI from 'ts-newsapi'
require('dotenv').config();

const newsAPI = new NewsAPI("dbd398427f004aa092f7711a0a25da61")
 
// Get the subset of news publishers that top headlines (newsAPI.getTopHeadlines()) are available from. 
// It's mainly a convenience method that you can use to keep track of the publishers available on the API, and you can pipe it straight through to your users.
  
 
// Search through millions of articles from over 50,000 large and small news sources and blogs.
function getHeadlines() {
    return newsAPI.getEverything({
        language: 'en',
        sources: ['nbc-news','cnn', 'the-washington-post', 'business-insider'], 
        pageSize: 30,
        page: 1,
    });
}

export {
    getHeadlines
    
}

