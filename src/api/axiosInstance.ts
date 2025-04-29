import axios from "axios";

const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match && match[2] !== undefined ? match[2] : null;
  }

const axiosInstance = axios.create({
  baseURL: 'https://api-hf.com',
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
  // },
});

export default axiosInstance;