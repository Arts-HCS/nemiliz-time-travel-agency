const numeroViajes = parseInt(localStorage.getItem("contador")) || 0;

const recordBox = document.getElementById('recordBox');

if (!numeroViajes == 0){
    agregarViajes(numeroViajes);
} else {
    recordBox.innerHTML = `<h5 class="big-message">No cuenta con viajes agendados</h5>`;
}

function agregarViajes(numeroViajes){
    for (let i = 1; i <= numeroViajes; i++){
        let infoViaje = JSON.parse(localStorage.getItem(`viaje${i}`));
        let infoEra = infoViaje.era;
        let infoFecha = infoViaje.fecha;
        let infoHora = infoViaje.hora;
        let infoNombreTarjeta = infoViaje.nombreTarjeta;
        let infoCodigo = infoViaje.codigo;
    
    
        let div = document.createElement('div');
        div.classList.add('info-viaje');
        div.innerHTML = `
        <div class="left-data">
            <p class="time-data">${infoFecha}, ${infoHora}</p>
            <p class="destino-data"><span class="bold">${infoEra}</span></p>
        </div>
        
        <div class="right-data">
            <p class="card-data"> <span class="bold">${infoNombreTarjeta}</span></p>
            <p class="card-data">Código de acceso: ${infoCodigo}</p>
        </div>
    
        <button class="action-ops borrar-viaje" id-viaje="viaje${i}">
            <i class="fa-solid fa-trash-can"></i>
            <p class="card-data">Cancelar viaje</p>        
        </button>    
        
        `
        recordBox.appendChild(div)
    }
    
    
    const botonesDeBorrar = document.querySelectorAll('.borrar-viaje');
    
    for (let boton of botonesDeBorrar){
        boton.addEventListener('click', ()=>{
            let id = boton.getAttribute('id-viaje');
            localStorage.removeItem(id);
            boton.parentElement.remove();
            numeroViajes -=1;
            localStorage.setItem('contador', numeroViajes)
        })
    }
    
}