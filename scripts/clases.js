class Pista {
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }
}

class Disco {
    constructor(nombre, autor, portada, codigo) {
        this.nombre = nombre;
        this.autor = autor;
        this.portada = portada;
        this.codigo = codigo;
        this.pistas = [];
    }

    agregarPista(pista) {
        this.pistas.push(pista);
    }

    cantidadPistas() {
        return this.pistas.length;
    }

    duracionTotal() {
        return this.formatoHHMMSS(this.pistas.reduce((total, pista) => total + pista.duracion, 0));
    }

    promedioDuracion() {
        const totalSegundos = this.pistas.reduce((total, pista) => total + pista.duracion, 0);
        return this.formatoHHMMSS(Math.round(totalSegundos / this.pistas.length));
    }

    formatoHHMMSS(segundos) {
        return [
            Math.floor(segundos / 3600),
            Math.floor((segundos % 3600) / 60),
            segundos % 60
        ]
            .map(v => v.toString().padStart(2, '0'))
            .join(':');
    }

    pistaMayorDuracion() {
        return this.pistas.reduce((max, pista) => pista.duracion > max.duracion ? pista : max);
    }
}