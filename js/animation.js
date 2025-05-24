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

        let op = `${dia} ${fecha} de ${mes}, ${year}`;
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


fetch('./db/data.json')
    .then(res => res.json())
    .then(data =>{
        const paises = Object.keys(data);
        agregarAeropuertos(paises, data);
        agregarPaises(paises, data);
        detectarLi()
    })


let fechaDeSalida = "", horaDeSalida = "", paisDeSalida = "", aeropuertoDeSalida = "";

function detectarLi(){
    const menuOptions = document.querySelectorAll('.menu li');
    const firstButton = document.getElementById('firstButton');
    menuOptions.forEach(menuOp=>{
        menuOp.addEventListener('click', (e)=>{
            let info = e.currentTarget.parentElement.id;
            let opcionElegida = menuOp.innerHTML;
            switch(info){
                case 'menuDate':
                    fechaDeSalida = opcionElegida;
                    break;
                case 'menuTime':
                    horaDeSalida = opcionElegida;
                    break;
                case 'menuCountry':
                    paisDeSalida = opcionElegida;
                    break;
                case 'menuAirport':
                    aeropuertoDeSalida = opcionElegida;
                    break;
                default:
                    break;
            }

            if (fechaDeSalida && horaDeSalida && paisDeSalida && aeropuertoDeSalida){
                firstButton.classList.remove('disabled');
                firstButton.classList.add('enabled');
            }
        })
    })
}

