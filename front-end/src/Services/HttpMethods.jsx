const URL_API = process.env.REACT_APP_URL;

const headers = {
  "Content-Type": "application/json",
};

const JoinURL = (complement) => {
  return `${URL_API}${complement}`;
};

const request = (complement, method = "GET", body = null) => {
  var url = JoinURL(complement);
  var option = {
    method: method,
    headers: { ...headers, Authorization: "Bearer " + localStorage.getItem("token") },
  };

  if (body) option.body = JSON.stringify(body);

  return fetch(url, option).then((resp) => {
    if (resp.status === 403 || resp.status === 401) {
      localStorage.removeItem("token");
      return (window.location.href = "/");
    }

    return resp.json();
  });
};

const requestImage = (complement, body) => {
  var url = JoinURL(complement);
  var option = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body,
  };

  return fetch(url, option).then((resp) => resp.json());
};

export const get = (complement) => {
  return request(complement);
};

export const post = (complement, body) => {
  return request(complement, "POST", body);
};

export const put = (complement, body) => {
  return request(complement, "PUT", body);
};

export const uploadImage = (complement, body) => {
  return requestImage(complement, body);
};
