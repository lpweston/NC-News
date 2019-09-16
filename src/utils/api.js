import axios from "axios";

const request = axios.create({
  baseURL: "https://news-northcoders.herokuapp.com/api"
});

export const getArticles = ({ author, topic, sort_by, order }) => {
  return request
    .get("/articles", {
      params: { author, topic, sort_by, order }
    })
    .then(res => {
      return res.data.articles;
    });
};

export const getArticle = article_id => {
  return request.get(`/articles/${article_id}`).then(res => {
    return res.data.article;
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

export const getUsers = () => {
  return request.get("/users").then(res => {
    return res.data.users;
  });
};

export const getUser = username => {
  return request.get(`/users/${username}`).then(res => {
    return res.data.user;
  });
};

export const getComments = article_id => {
  return request.get(`/articles/${article_id}/comments`).then(res => {
    return res.data.comments;
  });
};
