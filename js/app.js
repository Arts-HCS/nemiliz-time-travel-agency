function activarDropdown(dropdownID){
    const otrosDropdowns = document.querySelectorAll('.dropdown');
    const actualDropdown = document.getElementById(`${dropdownID}`);

    const select = actualDropdown.querySelector('.select');
    const caret = actualDropdown.querySelector('.caret');
    const menu = actualDropdown.querySelector('.menu');
    const options = actualDropdown.querySelectorAll('.menu li');
    const selected = actualDropdown.querySelector('.selected');

    let seleccionGuardada = localStorage.getItem(`${dropdownID}Elegido`);
    if (seleccionGuardada) {
        selected.innerHTML = seleccionGuardada;
        select.classList.remove('disabled')
        options.forEach(option =>{
            if (option.innerHTML === seleccionGuardada){
                option.classList.add('active')
            }
        });
        if (dropdownID === 'dropdownEra'){
            const costo = localStorage.getItem('costo');
            const nombre = localStorage.getItem('nombre');
            const epoca = localStorage.getItem('epoca');
            const mensaje = localStorage.getItem('mensaje');
            const anacronismo = localStorage.getItem('anacronismo'); 
            const imagen = localStorage.getItem('imagen')
    
            mostrarDestinoSeleccionado(costo, nombre, epoca, anacronismo, mensaje, imagen);
        }
    }

    select.addEventListener('click', ()=>{
        otrosDropdowns.forEach(otroDrop =>{
            const selectOtro = otroDrop.querySelector('.select');
            const caretOtro = otroDrop.querySelector('.caret');
            const menuOtro = otroDrop.querySelector('.menu');

            if (otroDrop !== actualDropdown){
                selectOtro.classList.remove('clicked');
                caretOtro.classList.remove('rotate');
                menuOtro.classList.remove('open');
            }
        })
        select.classList.toggle('clicked');
        caret.classList.toggle('rotate');
        menu.classList.toggle('open');
    });
    
    options.forEach(option =>{
        option.addEventListener('click', ()=>{
            selected.innerHTML = option.innerHTML;
            localStorage.setItem(`${dropdownID}Elegido`, option.innerHTML)
            select.classList.remove('clicked');
            caret.classList.remove('rotate');
            menu.classList.remove('open');
            options.forEach(op =>{
                op.classList.remove('active');
            })
            option.classList.add('active');
        });
    })
    
}

const diasDeLaSemana = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre','octubre', 'noviembre','diciembre'];

function crearFechas(dias, meses){
    let opcionesFechas = [];

    for (let i = 1; i < 6; i++){
        let date = new Date();
        date.setDate(date.getDate()+i);
        const dia = dias[date.getDay()];
        const fecha = date.getDate();
        const mes = meses[date.getMonth()];
        const year = date.getFullYear();

        let op = `${dia} ${fecha} de ${mes} ${year}`;
        opcionesFechas.push(op);
    };
    return opcionesFechas;
}

let fechas = crearFechas(diasDeLaSemana, meses);

function agregarFechas(fechas){
    let menuDate = document.getElementById('menuDate');
    for (let fecha of fechas){
        let date = document.createElement('li');
        date.innerHTML = fecha;
        menuDate.appendChild(date);
    }
    activarDropdown('dropdownDate');
}

agregarFechas(fechas);

activarDropdown('dropdownTime'); 

function agregarAeropuertos(paises, data){
    const menuAeropuertos = document.getElementById('menuAirport');
    for (let pais of paises){
        let aeropuertosPais = data[pais];
        aeropuertosPais.forEach(aeropuerto =>{
            let li = document.createElement('li');
            li.innerHTML = aeropuerto;
            li.className = `hidden-li ${pais}-li`
            menuAeropuertos.appendChild(li);
        })
    }
    activarDropdown('dropdownAirport');
}


function agregarPaises(listaPaises){
    const menuPaises = document.getElementById('menuCountry');
    for (let pais of listaPaises){
        let li = document.createElement('li');
        li.innerHTML = pais;
        menuPaises.appendChild(li);
    }
    activarDropdown('dropdownCountry');

    const optionsPaises = menuPaises.querySelectorAll('li');
    const airportSelect = document.getElementById('airportSelect');
    const airportSelected = document.getElementById('airportSelected');
    const menuAeropuertos = document.getElementById('menuAirport');

    
    optionsPaises.forEach(opPais =>{
        opPais.addEventListener('click', ()=>{
            airportSelect.classList.remove('disabled');
            airportSelected.innerHTML = 'Haz click para elegir';
            let airportOptions = menuAeropuertos.querySelectorAll('li');

            airportOptions.forEach(airportOp => {
                airportOp.classList.add('hidden-li');
            });
            airportOptions.forEach(airportOp => {
                if (airportOp.classList.contains(`${opPais.innerHTML}-li`)) {
                    airportOp.classList.remove('hidden-li');
                }
            });
        })
    })
}


fetch('./db/airports.json')
    .then(res => res.json())
    .then(data =>{
        const paises = Object.keys(data);
        agregarAeropuertos(paises, data);
        agregarPaises(paises, data);
        detectarLi()
    })

function detectarLi(){
    const menuOptions = document.querySelectorAll('.menu li');
    
    let dateConfirmation = JSON.parse(localStorage.getItem('dateConfirmation')) || false;
    let timeConfirmation = JSON.parse(localStorage.getItem('timeConfirmation')) || false;
    let countryConfirmation = JSON.parse(localStorage.getItem('countryConfirmation')) || false;
    let airportConfirmation = JSON.parse(localStorage.getItem('airportConfirmation')) || false;

    if (dateConfirmation && timeConfirmation && countryConfirmation && airportConfirmation){
        firstButton.classList.remove('disabled');
        firstButton.classList.add('enabled');
    }

    menuOptions.forEach(menuOp=>{
        menuOp.addEventListener('click', (e)=>{
            let info = e.currentTarget.parentElement.id;
            switch(info){
                case 'menuDate':
                    dateConfirmation = true;
                    localStorage.setItem('dateConfirmation', true);
                    break;
                case 'menuTime':
                    timeConfirmation = true;
                    localStorage.setItem('timeConfirmation', true);
                    break;
                case 'menuCountry':
                    countryConfirmation = true;
                    localStorage.setItem('countryConfirmation', true);
                    break;
                case 'menuAirport':
                    airportConfirmation = true;
                    localStorage.setItem('airportConfirmation', true);
                    break;
                default:
                    break;
            }

            if (dateConfirmation && timeConfirmation && countryConfirmation && airportConfirmation){
                firstButton.classList.remove('disabled');
                firstButton.classList.add('enabled');
            }
        })
    });
}

const firstButton = document.getElementById('firstButton');
const panel1 = document.getElementById('panelInfo1');
const panel2 = document.getElementById('panelInfo2');
const panel3 = document.getElementById('panelInfo3');
const panelPay = document.getElementById('panelPay');
const panelRes = document.getElementById('panelRes');
const returnButton1 = document.getElementById('returnBtn1');
const returnButton2 = document.getElementById('returnBtn2');

const travelHoursInput = document.getElementById('travelHours');


let dateSelected, timeSelected, countrySelected, airportSelected, diaDeLlegada, horaDeLlegada, eraSelected, horasASumar, costoViaje;

firstButton.addEventListener('click', ()=>{
    dateSelected = document.getElementById('dateSelected');
    timeSelected = document.getElementById('timeSelected');
    countrySelected = document.getElementById('countrySelected');
    airportSelected = document.getElementById('airportSelected');

    panel1.classList.add('hidden-panel');
    panel2.classList.remove('hidden-panel');
    panel3.classList.remove('hidden-panel');
    panel3.scrollIntoView({behavior: "smooth"})

    const departureHour = document.getElementById('depHour');
    const departureDay = document.getElementById('depDay');

    departureHour.value = timeSelected.innerHTML;
    departureDay.value = dateSelected.innerHTML;

    let horasGurdadas = localStorage.getItem('horasDeViaje');
    if (horasGurdadas){
        travelHoursInput.value = horasGurdadas;
        setHorario(horasGurdadas, dateSelected);
    }
});


let numerosAdmitidos = "1234567890"
let timeout;
const arrivalHour = document.getElementById('arrHour');
const arrivalDay = document.getElementById('arrDay');


function setHorario(input, dateSelected){
    horasASumar = input
    let dateValues = dateSelected.innerHTML.split(" ");
    let selectedAno = dateValues[4];
    let selectedMes = meses.indexOf(dateValues[3])
    let selectedDia = dateValues[1]
    let hora = timeSelected.innerHTML.slice(0,2);
    let selectedHora = parseInt(hora) + input

    let deRegreso = new Date(selectedAno, selectedMes,  selectedDia,selectedHora);

    let horaRegreso = deRegreso.getHours();
    horaDeLlegada = `${horaRegreso}:00 `
    if (horaRegreso <= 12){
        horaDeLlegada += "AM"
    } else{
        horaDeLlegada += "PM"
    }
    arrivalHour.value = horaDeLlegada;
        
    let diaRegreso = diasDeLaSemana[deRegreso.getDay()];
    let fechaRegreso = deRegreso.getDate();
    let mesRegreso = meses[deRegreso.getMonth()];
    let anioRegreso = deRegreso.getFullYear();
    diaDeLlegada = `${diaRegreso} ${fechaRegreso} de ${mesRegreso} ${anioRegreso}`;
    arrivalDay.value = diaDeLlegada;

    arrivalHour.classList.remove('hidden-input');
    arrivalDay.classList.remove('hidden-input');
}

travelHoursInput.addEventListener("keydown", (e)=>{
    let chosenKey = e.key;
    if (!numerosAdmitidos.includes(chosenKey) && chosenKey !== "Backspace"){
        e.preventDefault();
        return;
    }
    clearTimeout(timeout);

    timeout = setTimeout(()=>{
        let input = parseInt(travelHoursInput.value);
        if (input > 24){
            travelHoursInput.value = 24;
            input = 24;
        } else if (input <= 0){
            travelHoursInput.value = 1;
            input = 1;
        } else if (!travelHoursInput.value) {
            travelHoursInput.value = 1;
            input = 1;
        }
        horasASumar = input;
        setHorario(horasASumar, dateSelected);
        
        localStorage.setItem('horasDeViaje', horasASumar);

    }, 500)
    
});

returnButton1.addEventListener('click', ()=>{
    panel1.classList.remove('hidden-panel');
    panel2.classList.add('hidden-panel');
    panel3.classList.add('hidden-panel');
});

const panelBuyBtn = document.getElementById('panelBuyBtn');
let costo;

function mostrarDestinoSeleccionado(costo, nombre, epoca, anacronismo, mensaje, imagen) {
    panelNombre = document.getElementById('panelNombre');
    panelEra = document.getElementById('panelEra');
    panelAnaText = document.getElementById('panelAnaText');
    panelAnacronismo = document.getElementById('panelAnacronismo');
    panelMensaje = document.getElementById('panelMensaje');
    imageSite = document.getElementById('imageSite');

    eraSelected = epoca;
    hoursCost.classList.remove('hidden-input');
    hoursCost.value = `$${costo} MXN`;

    panelNombre.innerHTML = nombre;
    panelEra.innerHTML = epoca;
    panelAnaText.classList.remove('nodisplay');
    panelAnacronismo.innerHTML = anacronismo;
    panelAnacronismo.classList.remove('nodisplay');
    panelMensaje.innerHTML = mensaje;
    panelMensaje.classList.remove('nodisplay');
    panelBuyBtn.classList.remove('hidden-input');

    imageSite.style.backgroundImage = `url(${imagen})`;
}

function agregarDestinos(destOps, destinationsJSON) {
    const menuEra = document.getElementById('menuEra');

    for (let dest of destOps) {
        let destObject = destinationsJSON[dest];
        let epoca = destObject["epoca"];
        let nombre = destObject["nombre"];
        let anacronismo = destObject["anacronismo"];
        let mensaje = destObject["mensaje"];
        let costo = destObject["costo"];
        let imagen = destObject["img"];        

        let li = document.createElement('li');
        li.innerHTML = epoca;
        menuEra.appendChild(li);

        li.addEventListener('click', () => {
            localStorage.setItem('costo', costo);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('epoca', epoca);
            localStorage.setItem('anacronismo', anacronismo);
            localStorage.setItem('mensaje', mensaje);
            localStorage.setItem('imagen', imagen);
            mostrarDestinoSeleccionado(costo, nombre, epoca, anacronismo, mensaje, imagen);
        });
    }

    activarDropdown('dropdownEra');
}

fetch('./db/destinations.json')
    .then(resp => resp.json())
    .then(data =>{
        let destOps = Object.keys(data)
        agregarDestinos(destOps, data);
    })

panelBuyBtn.addEventListener('click', ()=>{
    const checkPanel = document.getElementById('panelInfo3');
    if (!travelHoursInput.value || travelHoursInput.value == 0){
        checkPanel.scrollIntoView({ behavior: 'smooth' })
    } else {
        panel2.classList.add('hidden-panel');
        panel3.classList.add('hidden-panel');
        panelPay.classList.remove('hidden-panel');
        cargarInforrmacionPagos();
        verificarInputs();
    }
})

returnButton2.addEventListener('click', ()=>{
    panelPay.classList.add('hidden-panel');
    panel2.classList.remove('hidden-panel');
    panel3.classList.remove('hidden-panel');
})

function cargarInforrmacionPagos(){
    const salidaPago = document.getElementById('salidaPago');
    const llegadaPago = document.getElementById('llegadaPago');
    const aeropuertoPago = document.getElementById('aeropuertoPago');
    const eraPago = document.getElementById('eraPago');
    const precioViaje = document.getElementById('precioViaje');
    let costoDeHora = localStorage.getItem('costo');

    costoViaje = costoDeHora * horasASumar;

    precioViaje.innerHTML = `$${costoViaje} MXN`

    salidaPago.innerHTML = `${dateSelected.innerHTML}, ${timeSelected.innerHTML}`

    llegadaPago.innerHTML = `${diaDeLlegada}, ${horaDeLlegada}`

    aeropuertoPago.innerHTML = airportSelected.innerHTML;
    eraPago.innerHTML = eraSelected;
}

const cardName = document.getElementById('cardName');
const cardNumber = document.getElementById('cardNumber');
const cardCVC = document.getElementById('cardCVC');
const cardMM = document.getElementById('cardMM');
const cardYY = document.getElementById('cardYY');

function verificarInputs(){
    let invalidChars = "1234567890,;:-_()/&%$#+*!?¿'{}[]¡°=<>@^|`~" 

    cardName.addEventListener('keydown', (e)=>{
        let keyPressed = e.key;
        if (invalidChars.includes(keyPressed)){
            e.preventDefault();
        }
    });

    let validNumbers = "1234567890"
    let validKeys = ["Backspace", "ArrowLeft", "ArrowRight"];

    cardNumber.addEventListener('keydown', (e)=>{
        let keyPressed = e.key;
        if (!validNumbers.includes(keyPressed) && !validKeys.includes(keyPressed)) {
            e.preventDefault();
        } else if ((cardNumber.value.length === 4 || cardNumber.value.length === 9 || cardNumber.value.length === 14) && keyPressed !== "Backspace"){
            cardNumber.value += "-"
        }

        if (cardNumber.value.length == 19 && keyPressed !== "Backspace"){
            e.preventDefault();
        }
    });
    
    cardCVC.addEventListener('keydown', (e)=>{
        let keyPressed = e.key;
        if (!validNumbers.includes(keyPressed) && !validKeys.includes(keyPressed)){
            e.preventDefault()
        }

        if (cardCVC.value.length == 3 && !validKeys.includes(keyPressed)){
            e.preventDefault();
        }
    });

    cardMM.addEventListener('keydown', (e) => {
        let keyPressed = e.key;
        if (!validNumbers.includes(keyPressed) && !validKeys.includes(keyPressed)) {
            e.preventDefault();
        }
    
        if (cardMM.value.length === 2 && !validKeys.includes(keyPressed)) {
            e.preventDefault();
        }
    });
    
    cardYY.addEventListener('keydown', (e) => {
        let keyPressed = e.key;
        if (!validNumbers.includes(keyPressed) && !validKeys.includes(keyPressed)) {
            e.preventDefault();
        }
    
        if (cardYY.value.length === 2 && !validKeys.includes(keyPressed)) {
            e.preventDefault();
        }
    });
   
}

const lastPayButton = document.getElementById('lastPayBtn');
let dayVerification = new Date();
let verificationMes = dayVerification.getMonth();
let yearString = dayVerification.getFullYear().toString(); 
let verificationYear = yearString.slice(-2);

lastPayButton.addEventListener('click', (e)=>{
    e.preventDefault(); 
    let codigoString = Math.random().toFixed(10);
    let codigoAletaorio = codigoString.slice(2,9);

    let cardMMV = cardMM.value < 13;
    let cardYYV = cardYY.value > verificationYear;
    let cardNumberV = cardNumber.value.length === 19;
    let cardCVCV = cardCVC.value.length === 3;

    if (cardYYV && cardMMV && cardNumberV && cardCVCV){
        Swal.fire({
            icon: "success",
            title: "Pago realizado correctamente",
            text: "Podrás acceder a tu cabina de viaje con el código encontrado abajo.",
            footer: `<p><b>Código: </b>${codigoAletaorio}</p>`
          });
          panelPay.classList.add('hidden-panel');
          panelRes.classList.remove('hidden-panel');
          guardarViaje(eraSelected, dateSelected, timeSelected, cardName.value, codigoAletaorio);

    } else{
          Swal.fire({
            title: "Tarjeta rechazada",
            text: "Verifique los datos de su tarjeta",
            icon: "error",
          });
    }

})

function guardarViaje(era, fecha, hora, nombreTarjeta, codigo){
    let contador = parseInt(localStorage.getItem("contador")) || 0;
    contador += 1;

    let viaje ={
        era: era,
        fecha: fecha.innerHTML,
        hora: hora.innerHTML,
        nombreTarjeta: nombreTarjeta,
        codigo: codigo
    };
    localStorage.setItem(`viaje${contador}`, JSON.stringify(viaje));
    localStorage.setItem("contador", contador);
}

function limpiarLocalStorage(){
    Object.keys(localStorage).forEach(clave =>{
        if (clave !== 'contador' && !clave.startsWith('viaje')){
            localStorage.removeItem(clave);
        }
    })
}

const botonReAgendar = document.getElementById('reAgendar');

botonReAgendar.addEventListener('click', ()=>{
    panelRes.classList.add('hidden-panel');
    panel1.classList.remove('hidden-panel');
    limpiarLocalStorage();
})