import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

//https://randomuser.me/api

const fetchData = () => {
  return axios
    .get(`https://randomuser.me/api`)
    .then((res) => {
      console.log(res.data.results);
      return res.data.results;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetchData().then((data) => {
      const newUsers = [...users, ...data];
      setUsers(newUsers);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {users.map((user, userID) => (
          <div key={userID}>
            <img
              src={user.picture.large}
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <h2>
              {user.name.first} {user.name.last}
            </h2>
          </div>
        ))}
        <button
          style={{
            borderRadius: "15%",
            fontSize: "35px",
            backgroundColor: "black ",
            color: "white",
          }}
          onClick={getUsers}
        >
          Add
        </button>
      </header>
    </div>
  );
}
