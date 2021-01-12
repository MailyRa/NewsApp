"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topHeadlines = exports.getSources = exports.getHeadlines = void 0;
var ts_newsapi_1 = __importDefault(require("ts-newsapi"));
require('dotenv').config();
var newsAPI = new ts_newsapi_1.default("dbd398427f004aa092f7711a0a25da61");
// Get the subset of news publishers that top headlines (newsAPI.getTopHeadlines()) are available from. 
// It's mainly a convenience method that you can use to keep track of the publishers available on the API, and you can pipe it straight through to your users.
function getSources() {
    return newsAPI.getSources({
        category: 'general',
        language: 'en',
        country: 'us',
    });
}
exports.getSources = getSources;
// Top and breaking headlines 
function topHeadlines(categoryName) {
    return newsAPI.getTopHeadlines({
        q: 'stocks',
        country: 'us',
        category: 'business',
        pageSize: 20,
        page: 1,
    });
}
exports.topHeadlines = topHeadlines;
// Search through millions of articles from over 50,000 large and small news sources and blogs.
function getHeadlines() {
    return newsAPI.getEverything({
        q: 'stocks',
        qInTitle: 'stock',
        sources: ['bbc-news'],
        language: 'en',
        sortBy: 'relevancy',
        pageSize: 20,
        page: 1,
    });
}
exports.getHeadlines = getHeadlines;
