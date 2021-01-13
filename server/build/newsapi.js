"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeadlines = void 0;
var ts_newsapi_1 = __importDefault(require("ts-newsapi"));
require('dotenv').config();
var newsAPI = new ts_newsapi_1.default("dbd398427f004aa092f7711a0a25da61");
// Get the subset of news publishers that top headlines (newsAPI.getTopHeadlines()) are available from. 
// It's mainly a convenience method that you can use to keep track of the publishers available on the API, and you can pipe it straight through to your users.
// Search through millions of articles from over 50,000 large and small news sources and blogs.
function getHeadlines() {
    return newsAPI.getEverything({
        language: 'en',
        sources: ['nbc-news', 'cnn', 'the-washington-post', 'business-insider'],
        pageSize: 30,
        page: 1,
    });
}
exports.getHeadlines = getHeadlines;
