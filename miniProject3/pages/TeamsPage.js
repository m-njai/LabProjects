import React, { useState, useEffect } from "react";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data.data); // 'data' contains the list of teams
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>NBA Teams</h1>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              {team.full_name} ({team.city}) - Conference: {team.conference}, Division: {team.division}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamsPage;
