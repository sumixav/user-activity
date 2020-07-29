import React from "react";
const UserRow = ({ data: user, onClick }) => {
  const handleClickUser = () => onClick(user.id)
  return (
    <>
      <tr onClick={handleClickUser}>
        <th>{user.id}</th>
        <td>{user.real_name}</td>
        <td>{user.tz}</td>
      </tr>
    </>
  );
};

export default UserRow;
