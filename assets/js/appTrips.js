const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const carName = document.getElementById("carName");
const btnSearch = document.getElementById("btnSearch");
const table = document.getElementById("tripsTable");

btnSearch.addEventListener("click", async (e) => {
  const trip = new Trip(fromDate.value, toDate.value, carName.value);
  trip.getTrips().then((trips) => {
    console.log(trips);
    $('#tripsTable').DataTable().clear();
    $('#tripsTable').DataTable().destroy();
    $(document).ready( function () {
      $('#tripsTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        data: trips,
        columns: [
          { data: 'driver' },
          { data: 'carNum' },
          { data: 'totalFuel' },
          { data: 'totalDriveKm' },
          {data: 'startDriveDate'},
          {data: 'endDriveDate'},
          {data: 'startDriveTime'},
          {data: 'endDriveTime'},
          {data: 'totalDriveTime'}
      ]
      }); 
    } );
  });
});

const addRowToTable = (rs)=>{
  let row=table.insertRow(0);
  let driver=row.insertCell(0);
  let vehicle=row.insertCell(1);
  let fuel=row.insertCell(2);
  let odometer=row.insertCell(3);
  let startDate=row.insertCell(4);
  let endDate=row.insertCell(5);
  let startTime=row.insertCell(6);
  let endTime=row.insertCell(7);
  let duration=row.insertCell(8);

  driver.innerHTML = rs.driver;
  vehicle.innerHTML = rs.carNum;
  fuel.innerHTML = rs.totalFuel;
  odometer.innerHTML = rs.totalDriveKm;
  startDate.innerHTML = rs.startDriveDate;
  endDate.innerHTML = rs.endDriveDate;
  startTime.innerHTML = rs.startDriveTime;
  endTime.innerHTML = rs.endDriveTime;
  duration.innerHTML = rs.totalDriveTime;
}