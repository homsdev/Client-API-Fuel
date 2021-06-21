const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const carName = document.getElementById("carName");
const btnSearch = document.getElementById("btnSearch");
const tbody = document.getElementById("dataTrips");

btnSearch.addEventListener("click", async (e) => {
  const trip = new Trip(fromDate.value, toDate.value, carName.value);
  tbody.innerHTML = "";
  trip.getTrips().then((data) => {
    console.log(data);
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
      const fragment = document.createDocumentFragment();
      for (rs of data) {
        let row = document.createElement("tr");
        let driver = document.createElement("td");
        let vehicle = document.createElement("td");
        let fuel = document.createElement("td");
        let odometer = document.createElement("td");
        let startDate = document.createElement("td");
        let endDate = document.createElement("td");
        let startTime = document.createElement("td");
        let endTime = document.createElement("td");
        let duration = document.createElement("td");

        driver.innerHTML = rs.driver;
        vehicle.innerHTML = rs.carNum;
        fuel.innerHTML = rs.totalFuel;
        odometer.innerHTML = rs.totalDriveKm;
        startDate.innerHTML = rs.startDriveDate;
        endDate.innerHTML = rs.endDriveDate;
        startTime.innerHTML = rs.startDriveTime;
        endTime.innerHTML = rs.endDriveTime;
        duration.innerHTML = rs.totalDriveTime;

        row.appendChild(driver);
        row.appendChild(vehicle);
        row.appendChild(fuel);
        row.appendChild(odometer);
        row.appendChild(startDate);
        row.appendChild(endDate);
        row.appendChild(startTime);
        row.appendChild(endTime);
        row.appendChild(duration);

        fragment.appendChild(row);
      }
      tbody.appendChild(fragment);
    }
  });
});
