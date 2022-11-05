import autos, { Auto } from './db';
export default class App {
    private autos: Auto[];
    public datosBusqueda;

    constructor(
        private resultado: HTMLDivElement,
        private marca: HTMLSelectElement,
        private year: HTMLSelectElement,
        private minimo: HTMLSelectElement,
        private maximo: HTMLSelectElement,
        private puertas: HTMLSelectElement,
        private transmision: HTMLSelectElement,
        private color: HTMLSelectElement
    ) {
        this.autos = autos;

        this.datosBusqueda = {
            marca: '',
            year: '',
            minimo: '',
            maximo: '',
            puertas: '',
            transmision: '',
            color: '',
        };

        this.setupEventListeners();

        this.llenarSelectYear();
    }

    public init = () => {
        this.mostrarAutos(this.autos);
    };

    private mostrarAutos(autos: Auto[]): void {
        this.limpiarHTML();

        autos.forEach((auto) => {
            const { marca, modelo, year, puertas, transmision, precio, color } =
                auto;

            const autoHTML = document.createElement('P');

            autoHTML.textContent = `
                ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
            `;

            this.resultado.appendChild(autoHTML);
        });
    }

    private noResultado(): void {
        this.limpiarHTML();

        const noResultado = document.createElement('DIV');
        noResultado.classList.add('alerta', 'error');
        noResultado.textContent =
            'No hay resultados, intenta con otros términos de búsqueda.';

        this.resultado.appendChild(noResultado);
    }

    private limpiarHTML = (): void => {
        while (this.resultado.firstChild) {
            this.resultado.firstChild.remove();
        }
    };

    private llenarSelectYear(): void {
        const maxYear = new Date().getFullYear();
        const minYear = maxYear - 10;

        for (let i = maxYear; i >= minYear; i--) {
            const opcion = document.createElement(
                'OPTION'
            ) as HTMLOptionElement;

            opcion.textContent = opcion.value = i.toString();

            this.year.appendChild(opcion);
        }
    }

    private setupEventListeners(): void {
        this.marca.addEventListener('change', this.changeSelectValue);
        this.year.addEventListener('change', this.changeSelectValue);
        this.minimo.addEventListener('change', this.changeSelectValue);
        this.maximo.addEventListener('change', this.changeSelectValue);
        this.puertas.addEventListener('change', this.changeSelectValue);
        this.transmision.addEventListener('change', this.changeSelectValue);
        this.color.addEventListener('change', this.changeSelectValue);
    }

    private changeSelectValue = (e: Event): void => {
        const target = e.target as HTMLSelectElement;

        this.datosBusqueda[target.id as keyof typeof this.datosBusqueda] =
            target.value;

        this.filtrarAuto();
    };

    private filtrarAuto(): void {
        const autosFiltrados = this.autos
            .filter(this.filtrarMarca)
            .filter(this.filtrarAnio)
            .filter(this.filtrarMinimo)
            .filter(this.filtrarMaximo)
            .filter(this.filtrarPuertas)
            .filter(this.filtrarTransmision)
            .filter(this.filtrarColor);

        if (autosFiltrados.length) {
            this.mostrarAutos(autosFiltrados);
        } else {
            this.noResultado();
        }
    }

    private filtrarMarca = (auto: Auto): boolean => {
        const { marca } = this.datosBusqueda;

        if (marca) {
            return auto.marca === marca;
        }

        return true;
    };

    private filtrarAnio = (auto: Auto): boolean => {
        const { year } = this.datosBusqueda;

        if (year) {
            return auto.year === parseInt(year);
        }

        return true;
    };

    private filtrarMinimo = (auto: Auto): boolean => {
        const { minimo } = this.datosBusqueda;

        if (minimo) {
            return auto.precio >= parseInt(minimo);
        }

        return true;
    };

    private filtrarMaximo = (auto: Auto): boolean => {
        const { maximo } = this.datosBusqueda;

        if (maximo) {
            return auto.precio <= parseInt(maximo);
        }

        return true;
    };

    private filtrarPuertas = (auto: Auto): boolean => {
        const { puertas } = this.datosBusqueda;

        if (puertas) {
            return auto.puertas === parseInt(puertas);
        }

        return true;
    };

    private filtrarTransmision = (auto: Auto): boolean => {
        const { transmision } = this.datosBusqueda;

        if (transmision) {
            return auto.transmision === transmision;
        }

        return true;
    };

    private filtrarColor = (auto: Auto): boolean => {
        const { color } = this.datosBusqueda;

        if (color) {
            return auto.color === color;
        }

        return true;
    };
}
