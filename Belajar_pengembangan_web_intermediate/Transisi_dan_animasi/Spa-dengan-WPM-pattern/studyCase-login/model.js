export class LoginModel {
  async login(username, password) {
    const response = await fetch("https://example.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("LOGIN_FAILED");
    }

    const user = await response.json();
    return user;
  }
}
