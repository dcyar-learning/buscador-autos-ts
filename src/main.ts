import './assets/css/normalize.css';
import './assets/css/skeleton.css';
import './assets/css/app.css';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
    const resultado = document.querySelector('#resultado') as HTMLDivElement;
    const marca = document.querySelector('#marca') as HTMLSelectElement;
    const year = document.querySelector('#year') as HTMLSelectElement;
    const minimo = document.querySelector('#minimo') as HTMLSelectElement;
    const maximo = document.querySelector('#maximo') as HTMLSelectElement;
    const puertas = document.querySelector('#puertas') as HTMLSelectElement;
    const transmision = document.querySelector(
        '#transmision'
    ) as HTMLSelectElement;
    const color = document.querySelector('#color') as HTMLSelectElement;

    const app = new App(
        resultado,
        marca,
        year,
        minimo,
        maximo,
        puertas,
        transmision,
        color
    );

    app.init();
});
