const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h1>{user.username}</h1>
      <div>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog =>
            <li key={user.name}> {blog.title}</li>
          )}
        </ul>
      </div>
    </>
  )
}
export default User
