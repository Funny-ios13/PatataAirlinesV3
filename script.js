var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

document.addEventListener("DOMContentLoaded", function() {
var now = new Date();
now.setHours(now.getHours() - 5);


now.setMinutes(now.getMinutes() + 10);
var minDepartureDate = now.toISOString().slice(0, 16);

now.setMinutes(now.getMinutes() + 10);
var minReturnDate = now.toISOString().slice(0, 16);

document.getElementById('departureDate').setAttribute('min', minDepartureDate);
document.getElementById('returnDate').setAttribute('min', minReturnDate);
});

let searchDataGlobal;

document.getElementById('searchForm').addEventListener('submit', function(event) {
event.preventDefault();
const formData = new FormData(event.target);


searchDataGlobal = {
    tripType: formData.get('tripType'),
    classType: formData.get('classType'),
    passengers: formData.get('passengers'),
    origin: formData.get('origin'),
    destination: formData.get('destination'),
    departureDate: formData.get('departureDate'),
    returnDate: formData.get('returnDate')
};

displayResults(searchDataGlobal);
});

function displayResults(searchData) {
document.querySelector('.menu-search').setAttribute('hidden', 'true');
document.querySelector('.menu-results-section').removeAttribute('hidden');
const resultsSection = document.getElementById('resultsSection');


const airportNames = {
    "PAT": "Aeropuerto Internacional de Patata City",
    "BAR": "Aeropuerto de Bartolome Island",
    "MED": "Aeropuerto de Medellín",
    "TRO": "Aeropuerto de Trolome"
};

if (airportNames[searchData.origin] === "Aeropuerto Internacional de Patata City" && airportNames[searchData.destination] === "Aeropuerto de Bartolome Island") {
    var choosenFlight = "PA3740"
} else if (airportNames[searchData.origin] === "Aeropuerto Internacional de Patata City" && airportNames[searchData.destination] === "Aeropuerto de Medellín") {
    var choosenFlight = "PA5839"
}
else if (airportNames[searchData.origin] === "Aeropuerto Internacional de Patata City" && airportNames[searchData.destination] === "Aeropuerto de Trolome") {
    var choosenFlight = "PA7050"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Bartolome Island" && airportNames[searchData.destination] === "Aeropuerto Internacional de Patata City") {
    var choosenFlight = "PA1979"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Bartolome Island" && airportNames[searchData.destination] === "Aeropuerto de Medellín") {
    var choosenFlight = "PA1758"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Bartolome Island" && airportNames[searchData.destination] === "Aeropuerto de Trolome") {
    var choosenFlight = "PA3374"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Medellín" && airportNames[searchData.destination] === "Aeropuerto Internacional de Patata City") {
    var choosenFlight = "PA8060"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Medellín" && airportNames[searchData.destination] === "Aeropuerto de Bartolome Island") {
    var choosenFlight = "PA2019"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Medellín" && airportNames[searchData.destination] === "Aeropuerto de Trolome") {
    var choosenFlight = "PA5520"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Trolome" && airportNames[searchData.destination] === "Aeropuerto Internacional de Patata City") {
    var choosenFlight = "PA3860"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Trolome" && airportNames[searchData.destination] === "Aeropuerto de Bartolome Island") {
    var choosenFlight = "PA4960"
}
else if (airportNames[searchData.origin] === "Aeropuerto de Trolome" && airportNames[searchData.destination] === "Aeropuerto de Medellín") {
    var choosenFlight = "PA2080"
}

resultsSection.innerHTML = `
    <h2>Resultados de búsqueda</h2>
    <hr>
    <p>Origen: ${airportNames[searchData.origin] || searchData.origin}</p>
    <p>Destino: ${airportNames[searchData.destination] || searchData.destination}</p>
    <p>Fecha de salida: ${searchData.departureDate}</p>
    <p>Fecha de regreso: ${searchData.returnDate}</p>
    <p>Ida y Vuelta: ${searchData.tripType}</p>
    <!--<p>Pasajeros: ${searchData.passengers}</p>-->
    <p>Pasajeros: 1</p>
    <p>Clase: ${searchData.classType}</p>
    <p>Vuelo: ${choosenFlight}</p>
    <button class="results-button" onclick="showBookingForm(searchDataGlobal)">Continuar</button>
    <button class="results-return-button" onclick="returnResults()">Cancelar</button>
`;
resultsSection.style.display = 'block';
}

function returnResults() {
document.querySelector('.menu-search').removeAttribute('hidden');
document.querySelector('.menu-results-section').setAttribute('hidden', 'true');
}

function showBookingForm(searchData) {
searchDataGlobal = searchData; // Store searchData in the global variable
document.querySelector('.menu-results-section').setAttribute('hidden', 'true');
document.querySelector('.menu-booking').removeAttribute('hidden');


const bookingSection = document.getElementById('bookingSection');
bookingSection.innerHTML = `
    <h2>Detalles de los pasajeros</h2>
    <hr>
    <form id="bookingForm" onsubmit="event.preventDefault(); buyAlo();">
        <div class="form-group">
            <label for="passengerFirstName">Nombre del pasajero:</label>
            <input type="text" id="passengerFirstName" name="passengerFirstName" required>
        </div>
        <div class="form-group">
            <label for="passengerLastName">Apellido del pasajero:</label>
            <input type="text" id="passengerLastName" name="passengerLastName" required>
        </div>
        <div class="form-group">
            <label for="passengerNationality">Nacionalidad:</label>
                <select id="passengerNationality" name="passengerNationality" required>
                    <option value="PATATEÑO">PATATEÑO</option>
                    <option value="BARTOLOMIANO">BARTOLOMIANO</option>
                    <option value="COLOMBIANO">COLOMBIANO</option>
                    <option value="TROLANO">TROLANO</option>
                </select>
        </div>
        <div class="form-group">
            <label for="passengerID">Cédula del pasajero:</label>
            <input type="number" id="passengerID" name="passengerID" required>
        </div>
        <div class="form-group">
            <label for="passengerPassport">Pasaporte del pasajero:</label>
            <input type="number" id="passengerPassport" name="passengerPassport" required>
        </div>
        <button class="booking-button" type="submit">Reservar</button>
        <button class="booking-button-return" type="button" onclick="bookingReturn()">Cancelar</button>
    </form>
`;
bookingSection.style.display = 'block';
}

function bookingReturn() {
    document.querySelector('.menu-booking').setAttribute('hidden', 'true');
    document.querySelector('.menu-search').removeAttribute('hidden');
}

function buyAlo() {


const originValue = searchDataGlobal.origin;
const destinationValue = searchDataGlobal.destination;
const departureDateValue = searchDataGlobal.departureDate;
const returnDateValue = searchDataGlobal.returnDate;
const tripTypeValue = searchDataGlobal.tripType;
//const passengersValue = searchDataGlobal.passengers;
const passengersValue = "1";
const classTypeValue = searchDataGlobal.classType;
const flight = "NO-FLIGHT-SELECTED";

const passengerFirstNameValue = document.getElementById('passengerFirstName').value;
const passengerLastNameValue = document.getElementById('passengerLastName').value;
const passengerNationalityValue = document.getElementById('passengerNationality').value;
const passengerIDValue = document.getElementById('passengerID').value;
const passengerPassportValue = document.getElementById('passengerPassport').value;

var url = "https://script.google.com/macros/s/AKfycbxwmsaLylK1BlAmwnO0QuICBZ4n2Raf0UlGTW0LsCErFn-VqyNhxn1ulc4dsCg8T-ig/exec";
var params = "origen=" + encodeURIComponent(originValue) + "&destino=" + encodeURIComponent(destinationValue) + "&fechaida=" + encodeURIComponent(departureDateValue) + "&fecharegreso=" + encodeURIComponent(returnDateValue) + "&triptype=" + encodeURIComponent(tripTypeValue) + "&pasajeros=" + encodeURIComponent(passengersValue) + "&clase=" + encodeURIComponent(classTypeValue) + "&passfirst=" + encodeURIComponent(passengerFirstNameValue) + "&passlast=" + encodeURIComponent(passengerLastNameValue) + "&passnacion=" + encodeURIComponent(passengerNationalityValue) + "&passid=" + encodeURIComponent(passengerIDValue) + "&passpass=" + encodeURIComponent(passengerPassportValue) + "&vuelo=" + encodeURIComponent(flight);

$.ajax({
    type: "POST",
    url: url,
    data: params,
    success: function(response) {
        alert(`*--Patata Airlines--*\nTu reserva fue confirmada con exito.\nPor favor no olvides de cancelar el valor pendiente en una de nuestras agencias o por transferencia en BankPatata.\n\n\nFue un placer atenderte!`);
    },
    error: function(xhr, status, error) {
        alert(`*--Patata Airlines--*\nHubo un error al reservar\nTu reserve fue RECHAZADA por un error interno.\nTe pedimos disculpas por el inconveniente.\n\nERROR: ${error}\n\n\nFue un placer atenderte!`);
    }
});

//El menu de booking se oculta
//document.querySelector('.menu-booking').setAttribute('hidden', 'true');
}