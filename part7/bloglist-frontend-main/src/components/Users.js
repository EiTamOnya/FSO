const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <div>
        <div>user   blog count</div>
        {users.map(user =>
          <div key={user.username}> {user.username}: {user.blogs.length}</div>
        )}
      </div>
    </>
  )
}

export default Users
