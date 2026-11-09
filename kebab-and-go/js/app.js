/* ==========================================================
   KEBAB&GO · Lógica de la aplicación
   ========================================================== */

/* ---------- Utilidades ---------- */

function eur(numero) {
    return numero.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

/* ---------- Estado ---------- */

// vista: 'inicio', 'menu' o 'comparar'
// r: posición del restaurante elegido
// carrito: { idRestaurante: { posicionProducto: cantidad } }
const estado = {
    vista: 'inicio',
    r: 0,
    carrito: {}
};

function restauranteActual() {
    return RESTAURANTES[estado.r];
}

function carrito() {
    const id = restauranteActual().id;

    if (!estado.carrito[id]) {
        estado.carrito[id] = {};
    }

    return estado.carrito[id];
}

function subtotal() {
    let total = 0;

    restauranteActual().menu.forEach(function (producto, i) {
        total += producto.p * (carrito()[i] || 0);
    });

    return total;
}

function cantidad() {
    let total = 0;

    Object.values(carrito()).forEach(function (q) {
        total += q;
    });

    return total;
}

/* ---------- Acciones ---------- */

function cambiar(i, delta) {
    const c = carrito();

    c[i] = Math.max(0, (c[i] || 0) + delta);
    render();
}

function elegir(i) {
    estado.r = i;
    render();
}

function ir(vista) {
    estado.vista = vista;
    window.scrollTo(0, 0);
    render();
}

function nuevoPedido() {
    estado.carrito = {};
    ir('menu');
}

/* ---------- Pantalla 1: menú ---------- */

function vistaMenu(app, bar) {
    const r = restauranteActual();

    // Pestañas con los 3 restaurantes
    let html = '<div class="tabs">';

    RESTAURANTES.forEach(function (x, i) {
        html += `
            <button class="tab ${i === estado.r ? 'on' : ''}" onclick="elegir(${i})">
                <b>${x.name}</b>
                <small>${x.sub}</small>
            </button>`;
    });

    html += '</div>';

    // Productos del restaurante
    r.menu.forEach(function (producto, i) {
        const q = carrito()[i] || 0;

        html += `
            <div class="item">
                <div>
                    <h3>${producto.n}</h3>
                    <p>${producto.d}</p>
                    <div class="price">${eur(producto.p)}</div>
                </div>
                <div class="qty">
                    ${q ? `<button onclick="cambiar(${i}, -1)" aria-label="Quitar">−</button><b>${q}</b>` : ''}
                    <button class="add" onclick="cambiar(${i}, 1)" aria-label="Añadir">+</button>
                </div>
            </div>`;
    });

    app.innerHTML = html;

    // Barra inferior con el total y el botón
    bar.innerHTML = `
        <span>
            <b>${cantidad()}</b> artículos · ${eur(subtotal())}<br>
            <small>${r.name}</small>
        </span>
        <button class="btn" ${cantidad() ? '' : 'disabled'} onclick="ir('comparar')">
            Hacer pedido →
        </button>`;
}

/* ---------- Pantalla 2: comparación ---------- */

function calcularOpciones() {
    const r = restauranteActual();
    const base = subtotal();

    // Primera opción: recoger en el local (precio de carta, sin extras)
    const opciones = [{
        name: 'Recoger en el local',
        icon: '🏪',
        items: base,
        env: 0,
        ser: 0,
        note: 'Precio de carta, sin comisiones'
    }];

    // Una opción por cada app de reparto
    Object.entries(r.apps).forEach(function ([nombre, c]) {
        opciones.push({
            name: nombre,
            icon: '🛵',
            items: base * (1 + c.m),
            env: c.e,
            ser: c.s,
            note: `Precios en app +${Math.round(c.m * 100)}% sobre carta`
        });
    });

    opciones.forEach(function (o) {
        o.total = o.items + o.env + o.ser;
    });

    // De más barata a más cara
    return opciones.sort(function (a, b) {
        return a.total - b.total;
    });
}

function vistaComparar(app, bar) {
    const r = restauranteActual();
    const opciones = calcularOpciones();
    const min = opciones[0].total;

    // Resumen del pedido
    let html = `
        <button class="link" onclick="ir('menu')">← Modificar pedido</button>

        <div class="sum">
            <b>${r.name}</b>
            <ul>`;

    r.menu.forEach(function (producto, i) {
        const q = carrito()[i] || 0;

        if (q) {
            html += `<li><span>${q}× ${producto.n}</span><span>${eur(producto.p * q)}</span></li>`;
        }
    });

    html += `
            </ul>
        </div>`;

    // Tarjeta de cada opción
    opciones.forEach(function (o) {
        const esLaMejor = (o.total === min);

        html += `
            <div class="opt ${esLaMejor ? 'best' : ''}">
                <div class="top">
                    <h3>${o.icon} ${o.name} ${esLaMejor ? '<span class="tag">Más barato</span>' : ''}</h3>
                    <div class="tot">${eur(o.total)}</div>
                </div>

                <div class="diff">
                    ${esLaMejor ? 'Mejor opción para este pedido' : `+${eur(o.total - min)} respecto a la más barata`}
                </div>

                <div class="det">
                    <div><span>Productos</span><span>${eur(o.items)}</span></div>
                    ${o.env || o.ser ? `
                    <div><span>Gastos de envío</span><span>${eur(o.env)}</span></div>
                    <div><span>Tarifa de servicio</span><span>${eur(o.ser)}</span></div>` : ''}
                    <div class="nota-app">${o.note}</div>
                </div>
            </div>`;
    });

    html += `
        <p class="note">
            Simulación con datos inventados. En la versión real, los precios vendrían de cada app y restaurante.
        </p>`;

    app.innerHTML = html;

    bar.innerHTML = `
        <span>Total más barato: <b>${eur(min)}</b></span>
        <button class="btn" onclick="nuevoPedido()">Nuevo pedido</button>`;
}

/* ---------- Render principal ---------- */

function render() {
    const enInicio = (estado.vista === 'inicio');

    // Mostrar la portada o el comparador (todo en la misma página)
    document.getElementById('inicio').hidden = !enInicio;
    document.getElementById('comparador').hidden = enInicio;

    if (enInicio) {
        return;
    }

    const app = document.getElementById('app');
    const bar = document.querySelector('#bar div');

    document.getElementById('s1').className = (estado.vista === 'menu') ? 'on' : '';
    document.getElementById('s2').className = (estado.vista === 'comparar') ? 'on' : '';

    if (estado.vista === 'menu') {
        vistaMenu(app, bar);
    } else {
        vistaComparar(app, bar);
    }
}

render();
