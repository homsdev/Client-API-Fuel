class Trip {
  constructor(fromDate, toDate, carNum) {
    this.username = sessionStorage.getItem("username");
    this.password = sessionStorage.getItem("password");
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.carNum = carNum;
  }

  formatData(tripData){
    const startDate= new Date(tripData.startDriveDate);
    const endDate=new Date(tripData.endDriveDate);
    const formatedStartDate = `${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`;
    const formatedEndDate = `${endDate.getDate()}/${endDate.getMonth()+1}/${endDate.getFullYear()}`;
    
    let fuelPerkm= tripData.totalDriveKm >0 ? (tripData.totalFuel/ tripData.totalDriveKm) : 0;
    
    let info= {
      'driver': tripData.driver,
      'carNum': tripData.carNum,
      'totalFuel': `${tripData.totalFuel} lt`,
      'totalDriveKm': `${tripData.totalDriveKm} Km`,
      'startDriveDate': formatedStartDate,
      'endDriveDate': formatedEndDate,
      'startDriveTime': tripData.startDriveTime,
      'endDriveTime': tripData.endDriveTime,
      'totalDriveTime': tripData.totalDriveTime,
      'fuelPerkm':  `${fuelPerkm.toFixed(2)} lt/km`
    }
    return info;
  }

  async getTrips() {
    const url = "https://api-v1-trips.herokuapp.com/api/v1/trips";
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
        else if(data.status==401){
          return data;
        }
        else if (data.status == 404) {
          alert(
            "No se encontraron viajes para el intervalo de tiempo proporcionado"
          );
          return data;
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

