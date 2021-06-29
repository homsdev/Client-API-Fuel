const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const carName = document.getElementById("carName");
const btnSearch = document.getElementById("btnSearch");
const table = document.getElementById("tripsTable");

btnSearch.addEventListener("click", async (e) => {
  const trip = new Trip(fromDate.value, toDate.value, carName.value);
  trip.getTrips().then((trips) => {
    console.log(trips);
    $("#tripsTable").DataTable().clear();
    $("#tripsTable").DataTable().destroy();
    $(document).ready(function () {
      $("#tripsTable").DataTable({
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "print"],
        data: trips,
        scrollX: true, 
        columns: [
          { data: "driver" },
          { data: "carNum" },
          { data: "totalFuel" },
          { data: "totalDriveKm" },
          { data: "startDriveDate" },
          { data: "endDriveDate" },
          { data: "startDriveTime" },
          { data: "endDriveTime" },
          { data: "totalDriveTime" },
          { data: "fuelPerkm" },
        ],
        language: {
          lengthMenu: "Mostrando _MENU_ registros por pagina",
          zeroRecords: "No hay viajes registrados",
          info: "Mostrando página _PAGE_ de _PAGES_",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(Filtrado  de _MAX_  registros)",
          search: "Buscar:",
          paginate: {
            first: "Primera",
            last: "Última",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
      });
    });
  });
});
