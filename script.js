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
let passengersData = [];
let currentPassenger = 0;

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    searchDataGlobal = {
        tripType: formData.get('tripType'),
        classType: formData.get('classType'),
        passengers: parseInt(formData.get('passengers')),
        origin: formData.get('origin'),
        destination: formData.get('destination'),
        departureDate: formData.get('departureDate'),
        returnDate: formData.get('returnDate')
    };

    displayPassengerForm(searchDataGlobal.passengers);
});

function displayPassengerForm(passengerCount) {
    document.querySelector('.menu-search').setAttribute('hidden', 'true');
    document.querySelector('.menu-booking').removeAttribute('hidden');
    updatePassengerForm(currentPassenger, passengerCount);
}

function updatePassengerForm(index, totalPassengers) {
    const passengerInfoDiv = document.getElementById('passengerInfo');
    passengerInfoDiv.innerHTML = `
        <h3>Pasajero ${index + 1} de ${totalPassengers}</h3>
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required>
        </div>
        <div class="form-group">
            <label for="nacionalidad">Nacionalidad:</label>
            <select id="nacionalidad" name="nacionalidad" required>
                <option value="PATATEÑA">PATATEÑA</option>
                <option value="BARTOLOMIANA">BARTOLOMIANA</option>
                <option value="COLOMBIANA">COLOMBIANA</option>
                <option value="TROLOMIANO">TROLOMIANO</option>
            </select>
        </div>
        <div class="form-group">
            <label for="cedula">Cédula:</label>
            <input type="number" id="cedula" name="cedula" required>
        </div>
        <div class="form-group">
            <label for="pasaporte">Pasaporte:</label>
            <input type="number" id="pasaporte" name="pasaporte" required>
        </div>
    `;

    document.getElementById('prevPassenger').style.display = index > 0 ? 'inline' : 'none';
    document.getElementById('nextPassenger').style.display = index < totalPassengers - 1 ? 'inline' : 'none';
    document.getElementById('submitBooking').style.display = index === totalPassengers - 1 ? 'inline' : 'none';
}

document.getElementById('prevPassenger').addEventListener('click', function() {
    savePassengerData(currentPassenger);
    currentPassenger--;
    updatePassengerForm(currentPassenger, searchDataGlobal.passengers);
});

document.getElementById('nextPassenger').addEventListener('click', function() {
    savePassengerData(currentPassenger);
    currentPassenger++;
    updatePassengerForm(currentPassenger, searchDataGlobal.passengers);
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    savePassengerData(currentPassenger);
    sendBookingData();
});

function savePassengerData(index) {
    const formData = new FormData(document.getElementById('bookingForm'));
    passengersData[index] = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        nacionalidad: formData.get('nacionalidad'),
        cedula: formData.get('cedula'),
        pasaporte: formData.get('pasaporte')
    };
    console.log(`Passenger ${index + 1} data saved: `, passengersData[index]);
}

function sendBookingData() {
    console.log("Sending booking data for all passengers...");
    passengersData.forEach((passenger, index) => {
        const data = {
            //...searchDataGlobal,
            passenger,
            passengerNumber: index + 1
        };
        const passdata = JSON.stringify(data);

        console.log(`PassData for Passenger ${index + 1}: ${passdata}`);

        const params = {
            origen: searchDataGlobal.origin,
            destino: searchDataGlobal.destination,
            fechaida: searchDataGlobal.departureDate,
            fecharegreso: searchDataGlobal.returnDate,
            triptype: searchDataGlobal.tripType,
            pasajeros: searchDataGlobal.passengers,
            clase: searchDataGlobal.classType,
            passdata: passdata,
            vuelo: "NO-FLIGHT-SELECTED"
        };

        $.post({
            url: 'https://script.google.com/macros/s/AKfycbxQN5dL4ssTJJvF5ootMhJJoTCos14IYNak3LWzzJJpS3UJApOgCFGDdU9HCGtdvJEZ/exec',
            data: params,
            success: function(response) {
                console.log(`YES ${index + 1} booking sent: `, response);
            },
            error: function(error) {
                console.error(`ERRROROOROROR ${index + 1} booking failed: `, error);
            }
        });
    });

    alert('Booking completed!');
    window.location.reload();
}

console.log('v.8');
/*
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
    */
