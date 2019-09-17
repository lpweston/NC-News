import axios from "axios";

const request = axios.create({
  baseURL: "https://news-northcoders.herokuapp.com/api"
});

export const getArticles = async ({ author, topic, sort_by, order }) => {
  const res = await request.get("/articles", {
    params: { author, topic, sort_by, order }
  });
  return res.data.articles;
};

export const getArticle = async article_id => {
  const res = await request.get(`/articles/${article_id}`);
  return res.data.article;
};

export const patchArticle = async (article_id, inc_votes) => {
  const res = await request.patch(`/articles/${article_id}`, { inc_votes });
  return res.data.article;
};

export const getTopics = async topic => {
  const res = await request.get("/topics");
  if (topic) {
    return res.data.topics.filter(({ slug }) => slug === topic)[0];
  }
  return res.data.topics;
};

export const getUsers = async () => {
  const res = await request.get("/users");
  return res.data.users;
};

export const getUser = async username => {
  const res = await request.get(`/users/${username}`);
  return res.data.user;
};

export const getComments = async article_id => {
  const res = await request.get(`/articles/${article_id}/comments`);
  return res.data.comments;
};

export const patchComments = async (comment_id, inc_votes) => {
  const res = await request.patch(`/comments/${comment_id}`, { inc_votes });
  return res.data.comment;
};
