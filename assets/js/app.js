const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = new Credentials(
    e.target.elements.username.value,
    e.target.elements.password.value
  );
  user.saveSession();
  const trip = new tripInfo("2021-06-08", "2021-06-09", "TR-013");
  trip.getTrips();
});

class Credentials {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  saveSession() {
    sessionStorage.setItem("username", this.username);
    sessionStorage.setItem("password", this.password);
  }
}




