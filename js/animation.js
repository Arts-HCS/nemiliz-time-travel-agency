function activarDropdown(dropdownID){
    const otrosDropdowns = document.querySelectorAll('.dropdown');
    const actualDropdown = document.getElementById(`${dropdownID}`);

    const select = actualDropdown.querySelector('.select');
    const caret = actualDropdown.querySelector('.caret');
    const menu = actualDropdown.querySelector('.menu');
    const options = actualDropdown.querySelectorAll('.menu li');
    const selected = actualDropdown.querySelector('.selected');

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

    for (let i = 0; i < 5; i++){
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


function agregarPaises(listaPaises, data){
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
            airportOptions.forEach(airportOp =>{
                if (airportOp.className == `hidden-li ${opPais.innerHTML}-li`){
                    airportOp.classList.remove('hidden-li');
                } else {
                    airportOp.classList.add('hidden-li')
                }
            })
        })
    })
}

let firstPanelProcess = false;

fetch('./db/data.json')
    .then(res => res.json())
    .then(data =>{
        const paises = Object.keys(data);
        agregarAeropuertos(paises, data);
        agregarPaises(paises, data);
        detectarLi()
    })


function detectarLi(){
    const menuOptions = document.querySelectorAll('.menu li');
    
    let dateConfirmation = false, timeConfirmation = false, countryConfirmation = false, airportConfirmation = false;

    menuOptions.forEach(menuOp=>{
        menuOp.addEventListener('click', (e)=>{
            let info = e.currentTarget.parentElement.id;
            switch(info){
                case 'menuDate':
                    dateConfirmation = true;
                    break;
                case 'menuTime':
                    timeConfirmation = true;
                    break;
                case 'menuCountry':
                    countryConfirmation = true;
                    break;
                case 'menuAirport':
                    airportConfirmation = true;
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
const returnButton1 = document.getElementById('returnBtn1');

let dateSelected, timeSelected, countrySelected, airportSelected;

firstButton.addEventListener('click', ()=>{
    dateSelected = document.getElementById('dateSelected');
    timeSelected = document.getElementById('timeSelected');
    countrySelected = document.getElementById('countrySelected');
    airportSelected = document.getElementById('airportSelected');

    panel1.classList.add('hidden-panel');
    panel2.classList.remove('hidden-panel');
    panel3.classList.remove('hidden-panel');

    const departureHour = document.getElementById('depHour');
    const departureDay = document.getElementById('depDay');

    departureHour.value = timeSelected.innerHTML;
    departureDay.value = dateSelected.innerHTML;
});

const travelHoursInput = document.getElementById('travelHours');

let timeOut;
travelHoursInput.addEventListener("input", ()=>{
    clearTimeout(timeOut);
    timeOut = setTimeout(()=>{
        let horasASumar = parseInt(travelHoursInput.value) || 0

        if (horasASumar > 24){
            travelHoursInput.value = 24
            horasASumar = 24;
        };
        let dateValues = dateSelected.innerHTML.split(" ");

        let dateAno = parseInt(dateValues[4]);
        let dateMes = meses.indexOf(dateValues[3]);
        let dateDia = parseInt(dateValues[1]);
        let hora = timeSelected.innerHTML.slice(0,2);
        let dateHora = parseInt(hora);

        let arrivalDate = new Date(dateAno, dateMes, dateDia, dateHora);
        arrivalDate.setHours(arrivalDate.getHours()+horasASumar);

        let numLlegada = arrivalDate.getHours();
        let horaDeLlegada = `${numLlegada}:00 `;
        if (numLlegada < 12){
            horaDeLlegada += "AM"
        } else {
            horaDeLlegada += "PM"
        }

        let arrivDay = diasDeLaSemana[arrivalDate.getDay()]
        let arrivDate = arrivalDate.getDate();
        let arrivMonth = meses[arrivalDate.getMonth()];
        let arrivYear = arrivalDate.getFullYear()

        let diaDeLlegada = `${arrivDay} ${arrivDate} de ${arrivMonth} ${arrivYear}`


        const arrivalHour = document.getElementById('arrHour');
        const arrivalDay = document.getElementById('arrDay');

        arrivalHour.value = horaDeLlegada;
        arrivalHour.classList.remove('hidden-input');

        arrivalDay.value = diaDeLlegada;
        arrivalDay.classList.remove('hidden-input');

    }, 500)
});
    


returnButton1.addEventListener('click', ()=>{
    panel1.classList.remove('hidden-panel');
    panel2.classList.add('hidden-panel');
    panel3.classList.add('hidden-panel');
});

