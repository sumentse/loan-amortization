import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://lending-api.azurewebsites.net",
});

apiClient.interceptors.request.use(
  (config) => {

    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_GIT_TOKEN_KEY}`;

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // handling edge case of network error
    if (error.message === "Network Error") {
      return Promise.reject("Network Error");
    } else {
      return Promise.reject(error.response);
    }
  }
);

const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy };
