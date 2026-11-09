/* ==========================================================
   Datos ficticios de la simulación

   Cada restaurante tiene su menú y las condiciones de cada app:
     m = recargo sobre el precio de carta (0.12 = 12 %)
     e = gastos de envío
     s = tarifa de servicio
   ========================================================== */

const RESTAURANTES = [

    {
        id: 'estambul',
        name: 'Kebab Estambul',
        sub: 'Centro · 0,6 km',
        menu: [
            { n: 'Kebab de pollo',   d: 'Pan pita, pollo, lechuga, tomate, salsa', p: 5.5 },
            { n: 'Kebab mixto',      d: 'Ternera y pollo, verduras, salsa',        p: 6.2 },
            { n: 'Dürüm de ternera', d: 'Wrap con ternera y cebolla',              p: 6.5 },
            { n: 'Falafel',          d: 'Pita con falafel y hummus',               p: 5.0 },
            { n: 'Patatas fritas',   d: 'Ración con salsa',                        p: 2.5 },
            { n: 'Refresco',         d: 'Lata 33 cl',                              p: 1.5 }
        ],
        apps: {
            'Glovo':     { m: 0.12, e: 1.99, s: 0.99 },
            'Uber Eats': { m: 0.15, e: 1.49, s: 1.20 },
            'Just Eat':  { m: 0.08, e: 2.49, s: 0.50 }
        }
    },

    {
        id: 'palace',
        name: 'Döner Palace',
        sub: 'Av. Mayor · 1,1 km',
        menu: [
            { n: 'Döner clásico',  d: 'Carne de ternera, ensalada, yogur',       p: 6.0 },
            { n: 'Döner especial', d: 'Doble carne y queso',                     p: 7.5 },
            { n: 'Plato kebab',    d: 'Carne, arroz y ensalada',                 p: 8.5 },
            { n: 'Durum pollo',    d: 'Wrap de pollo con salsa picante',         p: 6.0 },
            { n: 'Patatas kebab',  d: 'Patatas con carne y salsas',              p: 5.5 },
            { n: 'Ayran',          d: 'Bebida de yogur',                         p: 1.8 },
            { n: 'Kebab de pollo', d: 'Pan pita, pollo, lechuga, tomate, salsa', p: 5.9 },
            { n: 'Patatas fritas', d: 'Ración con salsa',                        p: 2.3 }
        ],
        apps: {
            'Glovo':     { m: 0.10, e: 2.49, s: 0.99 },
            'Uber Eats': { m: 0.18, e: 0.99, s: 1.50 },
            'Just Eat':  { m: 0.10, e: 1.99, s: 0.50 }
        }
    },

    {
        id: 'medina',
        name: 'Al-Medina Kebab',
        sub: 'Plaza Nueva · 1,8 km',
        menu: [
            { n: 'Kebab ternera',     d: 'Pita, ternera, cebolla, salsa blanca',    p: 5.8 },
            { n: 'Kebab vegetariano', d: 'Verduras asadas y queso',                 p: 5.2 },
            { n: 'Shawarma de pollo', d: 'Pollo marinado y pepinillos',             p: 6.3 },
            { n: 'Menú kebab',        d: 'Kebab + patatas + bebida',                p: 8.0 },
            { n: 'Baklava',           d: '2 piezas',                                p: 2.2 },
            { n: 'Agua',              d: 'Botella 50 cl',                           p: 1.0 },
            { n: 'Kebab de pollo',    d: 'Pan pita, pollo, lechuga, tomate, salsa', p: 5.6 },
            { n: 'Patatas fritas',    d: 'Ración con salsa',                        p: 2.4 }
        ],
        apps: {
            'Glovo':     { m: 0.14, e: 1.49, s: 0.99 },
            'Uber Eats': { m: 0.12, e: 1.99, s: 1.00 },
            'Just Eat':  { m: 0.06, e: 2.99, s: 0.50 }
        }
    }

];
