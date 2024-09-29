import React, { useState, useEffect } from "react";
import axios from "axios";
import JokeList from "./JokeList";
import Spinner from "./Spinner";
import "./App.css";

const LOCAL_STORAGE_KEY = "cheeZJokes";

function App() {
  const [jokes, setJokes] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  const [loading, setLoading] = useState(false);

  // Fetch new jokes from the API
  const fetchJokes = async () => {
    setLoading(true);
    let newJokes = [];
    let seenJokes = new Set(jokes.map(joke => joke.id));
    try {
      while (newJokes.length < 5) {
        const res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });
        const newJoke = res.data;
        if (!seenJokes.has(newJoke.id)) {
          newJokes.push({ ...newJoke, votes: 0, locked: false });
          seenJokes.add(newJoke.id);
        }
      }
      const updatedJokes = [...jokes, ...newJokes];
      setJokes(updatedJokes);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedJokes));
    } catch (error) {
      console.error("Error fetching jokes", error);
    }
    setLoading(false);
  };

  // Fetch jokes on component mount
  useEffect(() => {
    if (jokes.length === 0) fetchJokes();
  }, []);

  // Reset vote counts and clear local storage
  const resetVotes = () => {
    const resetJokes = jokes.map(joke => ({ ...joke, votes: 0 }));
    setJokes(resetJokes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resetJokes));
  };

  // Lock and unlock jokes
  const toggleLockJoke = (id) => {
    const updatedJokes = jokes.map(joke =>
      joke.id === id ? { ...joke, locked: !joke.locked } : joke
    );
    setJokes(updatedJokes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedJokes));
  };

  // Vote for a joke
  const voteJoke = (id, delta) => {
    const updatedJokes = jokes.map(joke =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );
    setJokes(updatedJokes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedJokes));
  };

  return (
    <div className="App">
      <h1>CheeZ Jokes</h1>
      {loading ? (
        <Spinner />
      ) : (
        <JokeList
          jokes={jokes}
          voteJoke={voteJoke}
          fetchJokes={fetchJokes}
          resetVotes={resetVotes}
          toggleLockJoke={toggleLockJoke}
        />
      )}
    </div>
  );
}

export default App;
