const diasDeLaSemana = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre','octubre', 'noviembre','diciembre'];

function activarDropdowns(){
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown =>{
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', ()=>{
            dropdowns.forEach(dropdownOtro =>{
                const selectOtro = dropdownOtro.querySelector('.select');
                const caretOtro = dropdownOtro.querySelector('.caret');
                const menuOtro = dropdownOtro.querySelector('.menu');

                if (dropdownOtro !== dropdown){
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
            options.forEach(option =>{
              option.classList.remove('active')
            });
            option.classList.add('active');
          });
        });
    });
}


function agregarFechas(diasDeLaSemana, meses){
    let opciones = [];

    for (let i = 0; i < 5; i++){
        let date = new Date();
        date.setDate(date.getDate()+i);

        const dia = date.getDay();
        const fechaHoy = date.getDate();
        const mes = date.getMonth();
        const yearHoy = date.getFullYear();
        
        let diaHoy = diasDeLaSemana[dia];
        let mesHoy = meses[mes];
        
        let op = `${diaHoy} ${fechaHoy} de ${mesHoy}, ${yearHoy}`;
        opciones.push(op);
    }
    return opciones;
}

let dateOptions = agregarFechas(diasDeLaSemana, meses);

function agregarOpciones(options){
    let menuDias = document.getElementById('menuDias');
    for (let option of options){
        let li = document.createElement('li');
        li.innerHTML = option;
        menuDias.appendChild(li);
    }
}

agregarOpciones(dateOptions);

function agregarPaises(nombresPaises, data){
    const menuPaises = document.getElementById('menuPaises');
    nombresPaises.forEach(nombre =>{
        let li = document.createElement('li');
        li.innerHTML = nombre;
        menuPaises.appendChild(li);
    })

    const optionsPaises = menuPaises.querySelectorAll('li');
    const airportSelected = document.getElementById('airportSelected');
    const airportSelect = document.getElementById('airportSelect');
    const menuAeropuertos = document.getElementById('menuAeropuertos')
    optionsPaises.forEach(option =>{
        option.addEventListener('click',()=>{
            airportSelected.innerHTML = 'Haz click para elegir';
            airportSelect.classList.remove('disabled');
            menuAeropuertos.innerHTML = '';
            let aeropuertos = data[option.innerHTML];
            let counter = 0;
            for (let aeropuerto of aeropuertos){
                counter ++;
                let li = document.createElement('li');
                li.innerHTML = aeropuerto;
                menuAeropuertos.appendChild(li)
                if (counter === aeropuertos.length){
                    activarDropdowns()
                }
            }
        });
        
    })

}

fetch('./db/data.json')
    .then(res => res.json())
    .then(data =>{
        const nombresPaises = Object.keys(data);
        agregarPaises(nombresPaises, data);
        activarDropdowns();
    });

