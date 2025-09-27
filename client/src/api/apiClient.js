import axios from "axios";

export const apiCLient = axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiCLient.interceptors.response.use(
  (response) => response,
  (err) => {
    let errorMsg = "An Unknown Error Occurred";
    if (err.code === "ECONNABORTED") {
      errorMsg = "Server timed out. Please try again.";
    } else if (err.response) {
      errorMsg = err.response.data.message || "A server error occurred.";
    } else if (err.request) {
      errorMsg =
        "No response from server. Please check your network connection.";
    } else {
      errorMsg = err.message;
    }
    // This is crucial: we return a rejected promise with the clean error message
    return Promise.reject(new Error(errorMsg));
  },
);
