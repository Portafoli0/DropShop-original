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
/* Codigo Real */

var Almacen = [];
// Objeto para almacenar los IDs de las imágenes por ruta
let Almacen_Imagen_Id = {};
// Numero
let id = 0;

function guardarEnLocalStorage() {
    let almacenJSON = JSON.stringify(Almacen);
    localStorage.setItem('almacen', almacenJSON);
    
    // Disparar el evento storage manualmente para que otras pestañas actualicen
    var storageEvent = new Event('storage');
    window.dispatchEvent(storageEvent);
}
guardarEnLocalStorage()

// Selecciona todos los elementos de html que comparten la misma clase Imagen-Del-Producto
var Imagen_Del_Producto = document.querySelectorAll(".Imagen-Del-Producto");

// Itera sobre cada elemento
Imagen_Del_Producto.forEach((imagen, index) => {
    var Ruta_de_la_imagen = imagen.getAttribute('src'); // Obtiene la ruta de la imagen

    if (Almacen_Imagen_Id[Ruta_de_la_imagen] !== undefined) {
        Almacen_Imagen_Id = Almacen_Imagen_Id[Ruta_de_la_imagen]; // Esto parece estar incorrecto, debería ser Almacen_Imagen_Id[Ruta_de_la_imagen] = id++;
    } else {
        Almacen_Imagen_Id[Ruta_de_la_imagen] = id++;
    }

    imagen.addEventListener('click', function() {
        // Obtener la ruta de la imagen al hacer clic
        var rutaImagen = imagen.getAttribute('src');
        var nombreProducto = imagen.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;
        var Precio_Real_O_Descuento = imagen.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        var Precio_Real = imagen.closest('.Productos').querySelector('#Precio-Real');
        var precioRealTexto = Precio_Real ? Precio_Real.textContent.trim() : '';
        
        // Obtener el ID del producto desde Almacen_Imagen_Id
        var idProducto = Almacen_Imagen_Id[rutaImagen]; // Asumiendo que Almacen_Imagen_Id tiene los IDs correspondientes a las rutas de imagen

        // Construir los parámetros de la URL codificados adecuadamente
        const params = `nombre=${encodeURIComponent(nombreProducto)}&id=${encodeURIComponent(idProducto)}&ruta=${encodeURIComponent(rutaImagen)}&Precio_Real_O_Descuento=${encodeURIComponent(Precio_Real_O_Descuento)}&Precio_Real=${encodeURIComponent(precioRealTexto)}`;

        // Redirigir a collection.html con los parámetros adecuados
        //window.location.href = `collection.html?${params}`;

        // Abrir una nueva ventana o pestaña con la URL
        var nuevaVentana = window.open(`collection.html?${params}`, '_blank');
        nuevaVentana.focus();  // Enfocar la nueva ventana o pestaña abierta
    });
});


// Función para actualizar la cantidad total mostrada
function actualizarCantidadTotal() {
    var cantidadTotal = Almacen.reduce(function(total, producto) {
        return total + producto.Cantidad;
    }, 0);
    
    // Actualizar en el carrito de compras
    var cantidadTotalElementoCarrito = document.querySelector('main .Container-Carrito-De-Compra .Contenedor .Contenedor-Icons .Numero');
    if (cantidadTotalElementoCarrito) {
        cantidadTotalElementoCarrito.textContent = `Carrito de compra (${cantidadTotal})`;
    }

    // Actualizar en la barra de navegación
    var cantidadTotalElementoNav = document.querySelector('nav .Container-Icons-Search-Buy .Numero-De-Productos-Almacenados');
    if (cantidadTotalElementoNav) {
        cantidadTotalElementoNav.textContent = cantidadTotal;
    }
}

// Ejecutar inicialmente para configurar la cantidad total al cargar la página
actualizarCantidadTotal();

function Mensaje() {
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

// Seleccionar todos los botones "Agregar al carrito"
var BotonAgregarAlCarrito = document.querySelectorAll('.Agregar-Al-Carrito-De-Compras');

// Iterar sobre cada botón
BotonAgregarAlCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Obtener la imagen, ruta, nombre y precio del producto
        var imagen = boton.closest('.Productos').querySelector(".Imagen-Del-Producto");
        var rutaImagen = imagen.getAttribute('src');
        var nombreProducto = imagen.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;
        var precio = imagen.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        //var Precio_Tipo_Entero = parseFloat(Almacen_Imagen_Id.replace('$', '').replace('.', '').trim());

        // Verificar si el producto ya está en Almacen
        var productoExistente = Almacen.find(producto => producto.src === rutaImagen);

        if (productoExistente) {
            // Si ya existe, incrementar la cantidad
            productoExistente.Cantidad++;

            // Actualizar la cantidad mostrada en el DOM
            var contenedorProductos = document.querySelector(`.Contenedor-De-Productos-En-El-Carro-De-Compra[src="${rutaImagen}"]`);
            var cantidadElemento = contenedorProductos.querySelector('p');
            cantidadElemento.textContent = productoExistente.Cantidad;
            Mensaje();
            actualizarCantidadTotal();
            guardarEnLocalStorage();
        } else {
            // Si el producto no existe, agregarlo al Almacen
            var Container = document.querySelector(".Container-Carrito-De-Compra .Contenedor");

            var Contenedor_De_Los_Productos = document.createElement('div');
            Contenedor_De_Los_Productos.classList.add('Contenedor-De-Productos-En-El-Carro-De-Compra');
            Contenedor_De_Los_Productos.setAttribute('src', rutaImagen); // Añadir atributo src para identificación

            Container.appendChild(Contenedor_De_Los_Productos);

            // Crear elementos para mostrar el producto en el carrito
            var imagenElemento = document.createElement('img');
            imagenElemento.src = rutaImagen;
            imagenElemento.alt = nombreProducto;
            imagenElemento.id = `imagen-${Almacen_Imagen_Id[rutaImagen]}`;
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
            cantidadElemento.textContent = '1';
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
            buttonMenos.addEventListener('click', function() {
                var producto = Almacen.find(item => item.Id === Almacen_Imagen_Id[rutaImagen]);

                if (producto.Cantidad > 1) {
                    producto.Cantidad--;
                    cantidadElemento.textContent = producto.Cantidad;
                    guardarEnLocalStorage();

                } else {
                    Almacen = Almacen.filter(item => item.Id !== Almacen_Imagen_Id[rutaImagen]);
                    Contenedor_De_Los_Productos.remove();
                    guardarEnLocalStorage();

                }
                actualizarCantidadTotal();
                Mensaje();
            });

            var buttonMas = document.createElement('button');
            buttonMas.style.backgroundColor = 'white';
            buttonMas.style.border = 'none';
            buttonMas.style.position = 'relative';
            buttonMas.style.left = '5px'
            buttonMas.innerHTML = '<img src="Icons/mas.webp" style="width: 13px; height: 13px;">';
            buttonMas.addEventListener('click', function() {
                var producto = Almacen.find(item => item.Id === Almacen_Imagen_Id[rutaImagen]);
                producto.Cantidad++;
                cantidadElemento.textContent = producto.Cantidad;
                actualizarCantidadTotal();
                Mensaje();
                guardarEnLocalStorage();
            });

            ul.appendChild(liBotones);
            liBotones.appendChild(buttonMenos);
            liBotones.appendChild(cantidadElemento);
            liBotones.appendChild(buttonMas);
            
            Contenedor_De_Los_Productos.appendChild(imagenElemento);
            Contenedor_De_Los_Productos.appendChild(ul);

            // Agregar el producto al Almacen
            Almacen.push({
                Id: Almacen_Imagen_Id[rutaImagen],
                Nombre: nombreProducto,
                src: rutaImagen,
                Precio: precio,
                Cantidad: 1,
            });
            actualizarCantidadTotal();
            Mensaje();
            guardarEnLocalStorage();
        }
    });
});



/* Codigo agregando eliminar boton funcional falta solamente el diseño
var Almacen = [];
// Objeto para almacenar los IDs de las imágenes por ruta
let Almacen_Imagen_Id = {};
// Numero
let id = 0;

// Selecciona todos los elementos de html que comparten la misma clase Imagen-Del-Producto
var Imagen_Del_Producto = document.querySelectorAll(".Imagen-Del-Producto");

// Itera sobre cada elemento
Imagen_Del_Producto.forEach((imagen, index) => {
    var Ruta_de_la_imagen = imagen.getAttribute('src'); // Obtiene la ruta de la imagen

    if (Almacen_Imagen_Id[Ruta_de_la_imagen] !== undefined) {
        Almacen_Imagen_Id = Almacen_Imagen_Id[Ruta_de_la_imagen]; // Esto parece estar incorrecto, debería ser Almacen_Imagen_Id[Ruta_de_la_imagen] = id++;
    } else {
        Almacen_Imagen_Id[Ruta_de_la_imagen] = id++;
    }

    imagen.addEventListener('click', function() {
        // Obtener la ruta de la imagen al hacer clic
        var rutaImagen = imagen.getAttribute('src');
        var nombreProducto = imagen.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;
        var Precio_Real_O_Descuento = imagen.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        var Precio_Real = imagen.closest('.Productos').querySelector('#Precio-Real');
        var precioRealTexto = Precio_Real ? Precio_Real.textContent.trim() : '';
        
        // Obtener el ID del producto desde Almacen_Imagen_Id
        var idProducto = Almacen_Imagen_Id[rutaImagen]; // Asumiendo que Almacen_Imagen_Id tiene los IDs correspondientes a las rutas de imagen

        // Construir los parámetros de la URL codificados adecuadamente
        const params = `nombre=${encodeURIComponent(nombreProducto)}&id=${encodeURIComponent(idProducto)}&ruta=${encodeURIComponent(rutaImagen)}`;


        // Redirigir a collection.html con los parámetros adecuados
        //window.location.href = `collection.html?${params}`;

        // Abrir una nueva ventana o pestaña con la URL
        var nuevaVentana = window.open(`collection.html?${params}`, '_blank');
        nuevaVentana.focus();  // Enfocar la nueva ventana o pestaña abierta
    });
});


// Función para actualizar la cantidad total mostrada
function actualizarCantidadTotal() {
    var cantidadTotal = Almacen.reduce(function(total, producto) {
        return total + producto.Cantidad;
    }, 0);
    
    // Actualizar en el carrito de compras
    var cantidadTotalElementoCarrito = document.querySelector('main .Container-Carrito-De-Compra .Contenedor .Contenedor-Icons .Numero');
    if (cantidadTotalElementoCarrito) {
        cantidadTotalElementoCarrito.textContent = `Carrito de compra (${cantidadTotal})`;
    }

    // Actualizar en la barra de navegación
    var cantidadTotalElementoNav = document.querySelector('nav .Container-Icons-Search-Buy .Numero-De-Productos-Almacenados');
    if (cantidadTotalElementoNav) {
        cantidadTotalElementoNav.textContent = cantidadTotal;
    }
}

// Ejecutar inicialmente para configurar la cantidad total al cargar la página
actualizarCantidadTotal();

function Mensaje() {
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

// Seleccionar todos los botones "Agregar al carrito"
var BotonAgregarAlCarrito = document.querySelectorAll('.Agregar-Al-Carrito-De-Compras');

// Iterar sobre cada botón
BotonAgregarAlCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Obtener la imagen, ruta, nombre y precio del producto
        var imagen = boton.closest('.Productos').querySelector(".Imagen-Del-Producto");
        var rutaImagen = imagen.getAttribute('src');
        var nombreProducto = imagen.closest('.Productos').querySelector('#Nombre_Del_Producto').textContent;
        var precio = imagen.closest('.Productos').querySelector('#Precio-Real-O-Descuento').textContent;
        //var Precio_Tipo_Entero = parseFloat(Almacen_Imagen_Id.replace('$', '').replace('.', '').trim());

        // Verificar si el producto ya está en Almacen
        var productoExistente = Almacen.find(producto => producto.src === rutaImagen);

        if (productoExistente) {
            // Si ya existe, incrementar la cantidad
            productoExistente.Cantidad++;

            // Actualizar la cantidad mostrada en el DOM
            var contenedorProductos = document.querySelector(`.Contenedor-De-Productos-En-El-Carro-De-Compra[src="${rutaImagen}"]`);
            var cantidadElemento = contenedorProductos.querySelector('p');
            cantidadElemento.textContent = productoExistente.Cantidad;
            Mensaje();
            actualizarCantidadTotal();
        } else {
            // Si el producto no existe, agregarlo al Almacen
            var Container = document.querySelector(".Container-Carrito-De-Compra .Contenedor");

            var Contenedor_De_Los_Productos = document.createElement('div');
            Contenedor_De_Los_Productos.classList.add('Contenedor-De-Productos-En-El-Carro-De-Compra');
            Contenedor_De_Los_Productos.setAttribute('src', rutaImagen); // Añadir atributo src para identificación

            Container.appendChild(Contenedor_De_Los_Productos);

            // Crear elementos para mostrar el producto en el carrito
            var imagenElemento = document.createElement('img');
            imagenElemento.src = rutaImagen;
            imagenElemento.alt = nombreProducto;
            imagenElemento.id = `imagen-${Almacen_Imagen_Id[rutaImagen]}`;
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
            cantidadElemento.textContent = '1';
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
            buttonMenos.addEventListener('click', function() {
                var producto = Almacen.find(item => item.Id === Almacen_Imagen_Id[rutaImagen]);

                if (producto.Cantidad > 1) {
                    producto.Cantidad--;
                    cantidadElemento.textContent = producto.Cantidad;
                } else {
                    Almacen = Almacen.filter(item => item.Id !== Almacen_Imagen_Id[rutaImagen]);
                    Contenedor_De_Los_Productos.remove();
                }
                actualizarCantidadTotal();
                Mensaje();
            });

            var buttonMas = document.createElement('button');
            buttonMas.style.backgroundColor = 'white';
            buttonMas.style.border = 'none';
            buttonMas.style.position = 'relative';
            buttonMas.style.left = '5px'
            buttonMas.innerHTML = '<img src="Icons/mas.webp" style="width: 13px; height: 13px;">';
            buttonMas.addEventListener('click', function() {
                var producto = Almacen.find(item => item.Id === Almacen_Imagen_Id[rutaImagen]);
                producto.Cantidad++;
                cantidadElemento.textContent = producto.Cantidad;
                actualizarCantidadTotal();
                Mensaje();
            });

            var Eliminar_Producto_li = document.createElement('li');
            var Eliminar_Producto = document.createElement('button');
            Eliminar_Producto.textContent = "Eliminar Producto";
            Eliminar_Producto.style.marginTop = '6px'
            Eliminar_Producto.addEventListener('click', function() {
                Almacen = Almacen.filter(item => item.Id !== Almacen_Imagen_Id[rutaImagen]);
                Contenedor_De_Los_Productos.remove();
                actualizarCantidadTotal();
                Mensaje();
            });




            ul.appendChild(liBotones);
            liBotones.appendChild(buttonMenos);
            liBotones.appendChild(cantidadElemento);
            liBotones.appendChild(buttonMas);
            
            ul.appendChild(Eliminar_Producto_li);
            Eliminar_Producto_li.appendChild(Eliminar_Producto);

            Contenedor_De_Los_Productos.appendChild(imagenElemento);
            Contenedor_De_Los_Productos.appendChild(ul);

            // Agregar el producto al Almacen
            Almacen.push({
                Id: Almacen_Imagen_Id[rutaImagen],
                Nombre: nombreProducto,
                src: rutaImagen,
                Precio: precio,
                Cantidad: 1,
            });
            actualizarCantidadTotal();
            Mensaje();
        }
    });
});*/