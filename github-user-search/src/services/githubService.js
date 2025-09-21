// import axios from "axios";

// const BASE_URL = "https://api.github.com/users/";

// export async function fetchUserData(username) {
//   const response = await axios.get(`${BASE_URL}${username}`);
//   return response.data;
// }


import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";
const url = "https://api.github.com/search/users?q"

export async function searchUsers({ username, location, minRepos }) {
  let query = username ? `${username} in:login` : "";

  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`${SEARCH_URL}?q=${query}`);
  return response.data.items; // returns array of users
}
