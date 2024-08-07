/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onDelete = (user) => {
    if (!window.confirm('Are you sure want to delete this user?')) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        //Show notification
        getUser();
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to="/users/add-new-user" className="btn-add">Add a new user</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }

          {!loading &&
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link to={'/users/' + user.id} className="btn-edit">Edit</Link>
                    &nbsp;
                    <button onClick={e => onDelete(user)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>}

        </table>
      </div>
    </div>
  )
}