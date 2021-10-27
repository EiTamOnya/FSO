import {
  Link
} from "react-router-dom"

const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <div>
        <div>user   blog count</div>
        {users.map(user =>
          <Link to={`/users/${user.id}`} key={user.username}> {user.username}: {user.blogs.length}</Link>
        )}
      </div>
    </>
  )
}

export default Users
