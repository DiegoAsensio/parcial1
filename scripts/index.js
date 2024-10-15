'use strict';

let discos = [];

// Cargo los discos desde el archivo JSON
fetch('discos.json')
  .then(response => response.json())
  .then(data => {
    discos = data;
    console.log('Discos cargados:', discos);
  })
  .catch(error => console.error('Error al cargar los discos:', error));

function generarHTMLDisco(disco) {
    const discoDatos = new Disco(disco.nombre, disco.artista, disco.portada, disco.id);
    disco.pistas.forEach(pista => discoDatos.agregarPista(new Pista(pista.nombre, pista.duracion)));

    return `
        <div class="disco">
            <img src="${disco.portada}" alt="Portada de ${disco.nombre}">
            <div class="disco-info">
                <h3>${disco.nombre}</h3>
                <p><strong>Artista:</strong> ${disco.artista}</p>
                <p><strong>Código:</strong> ${disco.id}</p>
                <p><strong>Pistas:</strong> ${discoDatos.cantidadPistas()}</p>
                <p><strong>Duración total:</strong> ${discoDatos.duracionTotal()}</p>
                <p><strong>Duración promedio:</strong> ${discoDatos.promedioDuracion()}</p>
                <p><strong>Pista más larga:</strong> ${discoDatos.pistaMayorDuracion().nombre} (${discoDatos.formatoHHMMSS(discoDatos.pistaMayorDuracion().duracion)})</p>
                <h4>Pistas:</h4>
                <ul>
                    ${disco.pistas.map(pista => `
                        <li class="${pista.duracion > 180 ? 'pista-larga' : ''}">
                            ${pista.nombre} - ${discoDatos.formatoHHMMSS(pista.duracion)}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

function mostrar() {
    const discosDiv = document.getElementById('discos');
    discosDiv.innerHTML = '';

    if (discos.length === 0) {
        discosDiv.innerHTML = '<p>No hay discos en el catálogo.</p>';
        return;
    }

    discos.forEach(disco => {
        discosDiv.innerHTML += generarHTMLDisco(disco);
    });
}

function cargar() {
    const nombre = prompt("Ingrese el nombre del disco:");
    if (!nombre) {
        alert("El nombre del disco no puede estar vacío.");
        return;
    }

    const artista = prompt("Ingrese el nombre del artista o banda:");
    if (!artista) {
        alert("El nombre del artista o banda no puede estar vacío.");
        return;
    }

    const portada = prompt("Ingrese la URL de la portada del disco:");
    if (!portada) {
        alert("La URL de la portada no puede estar vacía.");
        return;
    }

    let id;
    do {
        id = parseInt(prompt("Ingrese el código numérico único del disco (1-999):"));
        if (isNaN(id) || id < 1 || id > 999) {
            alert("El código debe ser un número entre 1 y 999.");
        } else if (discos.some(disco => disco.id === id)) {
            alert("Este código ya está en uso. Por favor, ingrese otro.");
        } else {
            break;
        }
    } while (true);

    const pistas = [];
    while (true) {
        const nombrePista = prompt("Ingrese el nombre de la pista (o cancele para terminar):");
        if (!nombrePista) break;

        let duracionPista;
        do {
            duracionPista = parseInt(prompt("Ingrese la duración de la pista en segundos (0-7200):"));
            if (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200) {
                alert("La duración debe ser un número entre 0 y 7200 segundos.");
            } else {
                break;
            }
        } while (true);

        pistas.push({ nombre: nombrePista, duracion: duracionPista });

        if (!confirm("¿Desea ingresar otra pista?")) break;
    }

    const nuevoDisco = { nombre, artista, id, portada, pistas };
    discos.push(nuevoDisco);
    alert("Disco cargado exitosamente.");
    mostrar();
}

function buscarDisco() {
    const id = parseInt(prompt("Ingrese el código del disco a buscar:"));
    const disco = discos.find(d => d.id === id);
    if (disco) {
        const discosDiv = document.getElementById('discos');
        discosDiv.innerHTML = '';
        mostrarDisco(disco);
    } else {
        alert("No se encontró ningún disco con ese código.");
    }
}

function mostrarDisco(disco) {
    const discosDiv = document.getElementById('discos');
    discosDiv.innerHTML = generarHTMLDisco(disco);
}