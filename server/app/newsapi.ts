import NewsAPI from 'ts-newsapi'

import {ApiNewsCategory} from 'ts-newsapi/lib/types'

require('dotenv').config();

const newsAPI = new NewsAPI("dbd398427f004aa092f7711a0a25da61")
 
// Get the subset of news publishers that top headlines (newsAPI.getTopHeadlines()) are available from. 
// It's mainly a convenience method that you can use to keep track of the publishers available on the API, and you can pipe it straight through to your users.

function getSources() {
    return newsAPI.getSources({
        category: 'general',
        language: 'en',
        country: 'us',
    });
}   
 
// Top and breaking headlines 
function topHeadlines(categoryName: ApiNewsCategory) {
    return newsAPI.getTopHeadlines({
        q: 'stocks',
        country: 'us',
        category: 'business',
        pageSize: 20,
        page: 1,
    });
}
 
// Search through millions of articles from over 50,000 large and small news sources and blogs.
function getHeadlines() {
    return newsAPI.getEverything({
        q: 'stocks',
        qInTitle: 'stock',
        sources: [ 'bbc-news' ],
        language: 'en',
        sortBy: 'relevancy',
        pageSize: 20,
        page: 1,
    });
}

export {
    getHeadlines,
    getSources,
    topHeadlines
}

