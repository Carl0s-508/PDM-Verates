export async function insertUserWeb(user: {
  id: string;
  username: string;
  email: string;
}) {
  const existing = JSON.parse(localStorage.getItem("users") || "[]");

  existing.push(user);

  localStorage.setItem("users", JSON.stringify(existing));
}