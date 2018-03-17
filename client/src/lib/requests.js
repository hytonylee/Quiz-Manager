const DOMAIN = "localhost:3000";
const API_PREFIX = "/v1";
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

const Quiz = {
  all() {
    return fetch(`${BASE_URL}/quizzes`, {
      headers: {}
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/quizzes/${id}`, {
      headers: {}
    }).then(res => res.json());
  },
  //----------------------------------------------
  create(params) {
    return fetch(`${BASE_URL}/quizzes`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  edit(params, id) {
    return fetch(`${BASE_URL}/quizzes/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const Question = {
  all() {
    return fetch(`${BASE_URL}/questions`, {
      headers: {}
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/questions/${id}`, {
      headers: {}
    }).then(res => res.json());
  },
  //----------------------------------------------
  create(params) {
    return fetch(`${BASE_URL}/questions`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  edit(params, id) {
    return fetch(`${BASE_URL}/questions/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const Token = {
  create(params) {
    return fetch(`${BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const User = {
  one(id) {
    return fetch(`${BASE_URL}/users/${id}`, {
      headers: {}
    }).then(res => res.json());
  },
  //----------------------------------------------
  all() {
    return fetch(`${BASE_URL}/users`, {
      headers: {}
    }).then(res => res.json());
  }
};

export { Quiz, Question, Token, User };
