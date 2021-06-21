class Trip {
  constructor(fromDate, toDate, carNum) {
    this.username = sessionStorage.getItem("username");
    this.password = sessionStorage.getItem("password");
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.carNum = carNum;
  }

  async getTrips() {
    const url = "http://localhost:3000/api/v1/trips";
    const body = {
      username: this.username,
      password: this.password,
      fromDate: this.fromDate,
      toDate: this.toDate,
      carNum: this.carNum,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    let trips= await fetch(url, options)
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch((error) => {
        console.log("Error", error);
      });

      return trips;
  }
}
