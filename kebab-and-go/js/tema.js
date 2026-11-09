/* Modo claro / oscuro (por defecto: oscuro, como el estilo de la marca) */

const botonesTema = document.querySelectorAll('.btn-tema');

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);

    botonesTema.forEach(function (boton) {
        boton.textContent = (tema === 'dark') ? 'Modo claro' : 'Modo oscuro';
    });

    try {
        localStorage.setItem('kebabgo-tema', tema);
    } catch (e) {
        // Si el navegador no deja guardar, no pasa nada
    }
}

function temaGuardado() {
    try {
        return localStorage.getItem('kebabgo-tema') || 'dark';
    } catch (e) {
        return 'dark';
    }
}

botonesTema.forEach(function (boton) {
    boton.addEventListener('click', function () {
        const actual = document.documentElement.getAttribute('data-theme');
        aplicarTema(actual === 'dark' ? 'light' : 'dark');
    });
});

aplicarTema(temaGuardado());
