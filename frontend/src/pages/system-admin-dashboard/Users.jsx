import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Users() {
  const [usersData, setUsersData] = useState([]);

  const { getAllUsersData } = useContext(AuthContext);
  useEffect(() => {
    getAllUsersData(setUsersData);
  }, []);

  return (
    <>
      <div className="table-wrapper">
        <div className="text-center d-flex flex-column flex-md-row align-items-center justify-content-between py-3 px-5 header">
          <h3 className="text-center">User Details</h3>
        </div>

        {usersData.length >= 1 ? (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>E-Mail</th>
                <th>Role</th>
                <th>address</th>
              </tr>
            </thead>

            <tbody>
              {usersData.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.name}</td>
                    <td>{val.email} </td>
                    <td>{val.role} </td>
                    <td>{val.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Add your Store</h1>
        )}
      </div>
    </>
  );
}

export default Users;
