// Script para ver abrir el Menú y tambien el buscador

// Obtiene el elemento del documento html con el id especificado Menu-Button
var MenuButton = document.getElementById('Menu-Button');
// Obtiene el elemento del documento html con la clase especificado Menu-Options
var MenuOptions = document.querySelector('.Menu-Options');

// Obtiene el elemento del documento html con el id especificado Lupa-Icon-For-Mobile
var LupaIconForMobile = document.getElementById('Lupa-Icon-For-Mobile');
// Obtiene el elemento del documento html con la clase especificado Container-Search
var ContainerSearch = document.querySelector('.Container-Search');

// Obtiene el elemento del documento html con el id especificado Carrito-De-Compras
var Carrito_De_Compras_Icon = document.getElementById('Carrito-De-Compras');
// Obtiene el elemento del documento html con la clase especificado Container-Search
var Container_Carrito_De_Compra = document.querySelector('.Container-Carrito-De-Compra');
// Obtiene el elemento del documento html con la clase especificado body
var body = document.querySelector('body');

// Obtiene todos los elementos del documento html que compartan la misma clase Close-Icon
var CloseIcons = document.querySelectorAll('.Close-Icon');

// Cada vez que se haga click al elemento que tenga el id Menu-Button hara todo lo que esta dentro de {}
MenuButton.addEventListener('click', function() {
    MenuOptions.style.left = '0';
});

// Cada vez que se haga click al elemento que tenga el id Lupa-Icon-For-Mobile hara todo lo que esta dentro de {}
LupaIconForMobile.addEventListener('click', function() {
    ContainerSearch.style.top = '0';
});

Carrito_De_Compras_Icon.addEventListener('click', function() {
    Container_Carrito_De_Compra.style.right = '0';
    body.style.overflowY = 'hidden';
});

// Obtiene todos los elementos del documento html que compartan la misma clase Close-Icon
var CloseIcons = document.querySelectorAll('.Close-Icon');

// Itera sobre cada elemento CloseIcon y añade un evento click
CloseIcons.forEach(function(icon) {
    // Cada vez que se haga click a cualquier elemento que tenga la clase Close-Icon hara todo lo que esta dentro de {}
    icon.addEventListener('click', function() {
        MenuOptions.style.left = '-100%';
        ContainerSearch.style.top = '-100%';
        Container_Carrito_De_Compra.style.right = '-100%';
        body.style.overflowY = 'scroll';
    });
});

/* --------------------------------------------------------------------------------------------------------------------- */

const params = new URLSearchParams(window.location.search);

        var rutaImagen = decodeURIComponent(params.get('ruta'));
        var Nombre_del_producto = decodeURIComponent(params.get('nombre'));
        var Precio_Real = decodeURIComponent(params.get('Precio_Real'));
        var Precio_Real_O_Descuento = decodeURIComponent(params.get('Precio_Real_O_Descuento'));

        document.title = Nombre_del_producto;

        var article = document.querySelector('main section .Contenedor article');

        article.innerHTML = `
            <div style="display: flex; justify-content: center;">
                <img src="${rutaImagen}" style="width: 314px; height: 314px;" alt="${Nombre_del_producto}">
            </div>
            
            <div>
                <ul>
                    <li> <p class="Nombre_del_producto">${Nombre_del_producto}</p> </li>

                    <li>
                        <div class="rating">
                            <input type="radio" id="star5" name="rating" value="5">
                            <label for="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4">
                            <label for="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3">
                            <label for="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2">
                            <label for="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1">
                            <label for="star1"></label>
                        </div>
                    </li>

                    <li> <p class="Precio_real">${Precio_Real}</p> </li>

                    <li> <p class="Precio_real_o_descuento">${Precio_Real_O_Descuento}</p> </li>

                    <li style="margin-bottom: 15px;"> <p>Cantidad (+20 disponibles)</p> </li>

                    <li style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-evenly;">
                                <button aria-label="Aumentar una unidad">
                                    <img src="Icons/mas.png" style="width: 20px; height: 20px;" alt="Aumentar una unidad">
                                </button>                                        
                                        
                                <p>1</p>
                                    
                                <button aria-label="Disminuir una unidad">
                                    <img src="Icons/menos.png" style="width: 20px; height: 20px;" alt="Disminuir una unidad">
                                </button>
                            </div>
                    </li>

                    <li>
                            <div style="display: flex;">
                                <button>
                                    <p style="margin-top: 0;">Comprar ahora</p>
                                </button>

                                <button style="text-align: left; padding-left: 10px; margin-left: 10px;" class="Agregar-Al-Carrito-De-Compras">
                                    <p>Agregar al</p>
                                    <img src="Icons/anadir-al-carrito.png" style="width: 18px; height: auto; position: relative; top: -18px; left: 75px;" alt="Icono de añadir al carrito de compra">                                    
                                </button>
                            </div>
                    </li>
                </ul>
            </div>
            `;


var Mostrar_overflow_caracteristicas_del_producto = document.querySelector('main section .Contenedor_2 .Caracteristicas_del_producto');
var Boton_Eliminar_Overflow_1 = document.getElementById('Eliminar-overflow_1');

Boton_Eliminar_Overflow_1.addEventListener('click', function() {
    Mostrar_overflow_caracteristicas_del_producto.style.height = 'auto';
});

var Mostrar_overflow_Descripcion = document.querySelector('main section .Contenedor_3 .Descripcion');
var Boton_Eliminar_Overflow_2 = document.getElementById('Eliminar-overflow_2');

Boton_Eliminar_Overflow_2.addEventListener('click', function() {
    Mostrar_overflow_Descripcion.style.height = 'auto';
});

function actualizarCantidadTotal() {

    var almacenJSON = localStorage.getItem('almacen');
    var Almacen = JSON.parse(almacenJSON);

    var CantidadTotal = Almacen.reduce(function(acumulador, objeto) {
    // Sumamos directamente objeto.Cantidad al acumulador
    return acumulador + objeto.Cantidad;
    }, 0);

    var cantidadTotalElementoCarrito = document.querySelector('main .Container-Carrito-De-Compra .Contenedor .Contenedor-Icons .Numero');
    if (cantidadTotalElementoCarrito) {
        cantidadTotalElementoCarrito.textContent = `Carrito de compra (${CantidadTotal})`;
    }

    // Actualizar en la barra de navegación
    var cantidadTotalElementoNav = document.querySelector('nav .Container-Icons-Search-Buy .Numero-De-Productos-Almacenados');
    if (cantidadTotalElementoNav) {
        cantidadTotalElementoNav.textContent = CantidadTotal;
    }
}

actualizarCantidadTotal();

function Mensaje() {
    
   var almacenJSON = localStorage.getItem('almacen');
   var Almacen = JSON.parse(almacenJSON);

    var Ruta_donde_debe_buscar = document.querySelector('main .Container-Carrito-De-Compra .Contenedor');
    
    // Verifica si existe el contenedor de productos
    var existeContenedorProductos = Ruta_donde_debe_buscar.querySelector('.Contenedor-De-Productos-En-El-Carro-De-Compra');
    
    var precioTotal = Almacen.reduce(function(total, producto) {
    // Obtenemos el precio como string sin el signo de dólar
    var precioString = producto.Precio.replace('$', '');
  
    // Eliminamos tanto las comas como los puntos
    precioString = precioString.replace(/[,\.]/g, '');
  
    // Convertimos el precioString a un número
    var precioNumerico = parseFloat(precioString);
  
    // Multiplicamos el precio por la cantidad de cada producto
    var precioTotalProducto = precioNumerico * producto.Cantidad;
  
    // Sumamos el precio total del producto al acumulado total
    return total + precioTotalProducto;
  
    }, 0);

    var precioTotalConComas = precioTotal.toLocaleString('es-ES');
    var precioTotalConSimbolo = `Finalizar pedido - $${precioTotalConComas}`;

    // Obtener el botón dentro de .Finalizar_Pedido para ponerle el mensaje
    var botonFinalizarPedido = document.querySelector('main .Container-Carrito-De-Compra .Finalizar_pedido button');

    // Verificar si ya existe un mensaje en el botón
    var mensajeExistente = botonFinalizarPedido.querySelector('.mensaje');
    
    if (mensajeExistente) {
        // Si existe, actualiza el texto
        mensajeExistente.textContent = !existeContenedorProductos ? "Sigue explorando" : `${precioTotalConSimbolo}`;
    } else {
        // Crear un nuevo elemento <span> solo si no existe
        var mensaje = document.createElement('span');
        mensaje.className = 'mensaje'; // Asignar una clase

        // Establecer el texto del mensaje
        mensaje.textContent = !existeContenedorProductos ? "Sigue explorando" : `${precioTotalConSimbolo}`;
        
        // Agregar el mensaje al botón
        botonFinalizarPedido.appendChild(mensaje);
    }
}

Mensaje();


function renderizarProductosEnCarrito() {
    var almacenJSON = localStorage.getItem('almacen');
    var Almacen = JSON.parse(almacenJSON);
        
    // Obtener un array de nombres de productos
    var nombresArray = Almacen.map(function(producto) {
        return producto.Nombre;
    });

    // Limpiar el contenedor antes de renderizar de nuevo
    var Contenedor = document.querySelector('.Container-Carrito-De-Compra .Contenedor');
    //Contenedor.innerHTML = '';

    // Obtener todos los elementos existentes en el carrito
    var elementosEnCarrito = document.querySelectorAll('.Container-Carrito-De-Compra .Contenedor .Contenedor-De-Productos-En-El-Carro-De-Compra');

    // Iterar sobre cada producto en el almacen
    Almacen.forEach(function(producto) {
        var rutaImagen = producto.src;
        var nombreProducto = producto.Nombre;
        var precio = producto.Precio;
        var cantidad = producto.Cantidad;

        // Verificar si ya existe un contenedor para esta imagen
        var Contenedor_De_Los_Productos = document.querySelector(`.Contenedor-De-Productos-En-El-Carro-De-Compra[id="${nombreProducto}"]`);

        if (!Contenedor_De_Los_Productos) {
            // Si no existe, crear el contenedor y el elemento de imagen
            Contenedor_De_Los_Productos = document.createElement('div');
            Contenedor_De_Los_Productos.classList.add('Contenedor-De-Productos-En-El-Carro-De-Compra');
            Contenedor_De_Los_Productos.setAttribute('id', nombreProducto);
 
            var imagenElemento = document.createElement('img');
            imagenElemento.src = rutaImagen;
            imagenElemento.alt = nombreProducto;
            imagenElemento.style.width = '180px';
            imagenElemento.style.height = '180px';
            imagenElemento.style.borderRadius = '30px';
 
            var ul = document.createElement('ul');
            var nombreElemento = document.createElement('li');
            nombreElemento.textContent = nombreProducto;
            nombreElemento.style.fontSize = '15px';
            nombreElemento.style.fontFamily = 'Poppins 400 (Regular)';
            ul.appendChild(nombreElemento);

            var precioElemento = document.createElement('li');
            precioElemento.textContent = precio;
            precioElemento.style.fontFamily = 'Poppins 600';
            ul.appendChild(precioElemento);

            var liBotones = document.createElement('li');

            var cantidadElemento = document.createElement('p');
            cantidadElemento.textContent = cantidad;
            cantidadElemento.style.width = '16px';
            cantidadElemento.style.height = '16px';
            cantidadElemento.style.fontSize = '16px';
            cantidadElemento.style.textAlign = 'center';
            cantidadElemento.style.border = '0';
            cantidadElemento.style.display = 'inline-block';
            cantidadElemento.style.margin = '0';
            cantidadElemento.style.padding = '0';

            var buttonMenos = document.createElement('button');
            buttonMenos.style.backgroundColor = 'white';
            buttonMenos.style.border = 'none';
            buttonMenos.innerHTML = '<img src="Icons/menos.png" style="width: 13px; height: 13px; position: relative; right: 6px;">';

            var buttonMas = document.createElement('button');
            buttonMas.style.backgroundColor = 'white';
            buttonMas.style.border = 'none';
            buttonMas.style.position = 'relative';
            buttonMas.style.left = '5px'
            buttonMas.innerHTML = '<img src="Icons/mas.webp" style="width: 13px; height: 13px;">';

            liBotones.appendChild(buttonMenos);
            liBotones.appendChild(cantidadElemento);
            liBotones.appendChild(buttonMas);
            ul.appendChild(liBotones);

            // Agregar elementos al contenedor
            Contenedor_De_Los_Productos.appendChild(imagenElemento);
            Contenedor_De_Los_Productos.appendChild(ul);

            // Agregar el contenedor al contenedor principal del carrito
            Contenedor.appendChild(Contenedor_De_Los_Productos);
            Mensaje();
            actualizarCantidadTotal();
        } else {
            // Si el contenedor ya existe, actualizar la cantidad
            var cantidadElemento = Contenedor_De_Los_Productos.querySelector('p');
            cantidadElemento.textContent = cantidad;
            Mensaje();
            actualizarCantidadTotal();
        }
    });

    // Eliminar elementos que no están en el almacen
    elementosEnCarrito.forEach(function(elemento) {
        var idDelElemento = elemento.id;

        // Verificar si el id del elemento no está en nombresArray
        if (!nombresArray.includes(idDelElemento)) {
            // El elemento no está en nombresArray, se elimina del DOM
            elemento.remove();
            Mensaje();
            actualizarCantidadTotal();
        }
    });
}

// Ejecutar la función para renderizar los productos en el carrito
renderizarProductosEnCarrito();

// Event listener para escuchar cambios en localStorage
window.addEventListener('storage', function(event) {
    if (event.key === 'almacen') {
        renderizarProductosEnCarrito();
    }
});
