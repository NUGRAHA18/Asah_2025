import { LoginModel } from "./model.js";
import { LoginPagePresenter } from "./presenter.js";

export class LoginPageView {
  render() {
    const container = document.getElementById("container");
    container.innerHTML = `
      <input id="usernameInput" placeholder="Username" />
      <input id="passwordInput" type="password" placeholder="Password" />
      <button id="loginButton">Login</button>
    `;
  }

  async afterRender() {
    const model = new LoginModel();
    const presenter = new LoginPagePresenter(model, this);
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", async () => {
      const username = document.getElementById("usernameInput").value;
      const password = document.getElementById("passwordInput").value;
      await presenter.loginUser(username, password);
    });
  }

  showLoading() {
    const container = document.getElementById("container");
    container.innerText = "Memproses login...";
  }

  renderLoginSuccess(user) {
    const container = document.getElementById("container");
    container.innerText = `Selamat datang, ${user.name}!`;
  }

  renderLoginError() {
    const container = document.getElementById("container");
    container.innerText = "Login gagal. Cek kembali username dan password.";
  }
}
