import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [form, setForm] = useState({ username: "", location: "", minRepos: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const test = fetchUserData
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const users = await searchUsers(form);
      setResults(users);
    } catch (err) {
      setError("Error fetching results. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="minRepos"
          placeholder="Minimum Repositories"
          value={form.minRepos}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="bg-gray-100 p-4 rounded shadow hover:shadow-lg"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h2 className="text-lg font-semibold text-center mt-2">
              {user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 block text-center mt-2"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
