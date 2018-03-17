const DOMAIN = "localhost:3000";
const API_PREFIX = "/v1";
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

const Quiz = {
  all() {
    return fetch(`${BASE_URL}/quizzes`, {
      headers: {}
    }).then(res => res.json());
  },
  one(id) {
    return fetch(`${BASE_URL}/quizzes/${id}`, {
      headers: {}
    }).then(res => res.json());
  },
  create() {},
  edit() {}
};

const Question = {
  all() {},
  one(id) {},
  create() {},
  edit() {}
};

const Token = {
  create() {}
};

export { Quiz, Question, Token };
