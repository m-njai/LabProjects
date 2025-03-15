import React, { useState, useEffect } from "react";

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/players")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.data); // 'data' contains the list of players
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>NBA Players</h1>
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.first_name} {player.last_name} - Team: {player.team ? player.team.full_name : "N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayersPage;
