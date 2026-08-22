export default function LogoutButton() {
  function handleLogout() {
    console.log("User logged out");
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
