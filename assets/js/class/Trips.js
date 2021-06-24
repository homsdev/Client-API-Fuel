class Trip {
  constructor(fromDate, toDate, carNum) {
    this.username = sessionStorage.getItem("username");
    this.password = sessionStorage.getItem("password");
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.carNum = carNum;
  }

  formatData(tripData){
    let info= {
      'driver': tripData.driver,
      'carNum': tripData.carNum,
      'totalFuel': tripData.totalFuel,
      'totalDriveKm': tripData.totalDriveKm,
      'startDriveDate': tripData.startDriveDate,
      'endDriveDate': tripData.endDriveDate,
      'startDriveTime': tripData.startDriveTime,
      'endDriveTime': tripData.endDriveTime,
      'totalDriveTime': tripData.totalDriveTime
    }
    return info;
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
      .then(data => {
        if(data.status == 500){
          alert("Asegurese de rellenar todos los campos")
        }
        else if (data.status == 400) {
          alert("Intervalo de tiempo no válido");
        }
        else if (data.status == 404) {
          alert(
            "No se encontraron viajes para el intervalo de tiempo proporcionado"
          );
        } else {
          let tripsList=[];
          for(let tripInfo of data){
            tripsList.push(this.formatData(tripInfo));
          }
          return tripsList;
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });

      return trips;
  }
}

