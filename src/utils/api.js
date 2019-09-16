import axios from "axios";

const request = axios.create({
  baseURL: "https://news-northcoders.herokuapp.com/api"
});

export const getArticles = () => {
  return request.get("/articles").then(res => {
    return res.data.articles;
  });
};

export const getTopics = topic => {
  return request.get("/topics").then(res => {
    if (topic) {
      return res.data.topics.filter(({ slug }) => slug === topic)[0];
    }
    return res.data.topics;
  });
};
