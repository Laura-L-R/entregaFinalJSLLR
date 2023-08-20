// Comienza viendo si el carrito tiene algo almacenado el el local storage (de alguna otra vez que se entró a la página), o si está vacío
let carrito = JSON.parse(localStorage.getItem("obrasCompradas")) || [];
console.log(carrito);

const contenedorProgramacion = document.getElementById("contenedor-programacion-actual"); // Se captura el contenedor que contiene la programación (agregada de modo dinámico, ver la función en home.js)

const agregarObraAlCarrito = (obra) => {
	const estaRepetido = carrito.some((item) => item.id === obra.id);
    if (!estaRepetido) { // Si no está repetido (solamente hay una entrada), lo agrega directamente al carrito
		carrito.push(obra);
		const precioCarrito = carrito.find(e => e.id == obra.id)
		precioCarrito.cantidad = Number(precioCarrito.cantidad)
		precioCarrito.precio = precioEntrada
		console.log(precioCarrito);
		console.log("entrada agregada");
            pintarObraCarrito();
            actualizarTotalesCarrito(carrito);
	} else {
		const obraExistente = carrito.find((item) => item.id === obra.id); // Busca si hay otra obra con el mismo id para saber si está repe
		console.log(obraExistente);
		obraExistente.cantidad++; // Si está repetida, aumenta la cantidad
		const cantidadObra = document.getElementById(`cantidad ${obra.id}`);
		cantidadObra.innerText = `Cantidad: ${obraExistente.cantidad}`;
		actualizarTotalesCarrito(carrito);
	}
};

const pintarObraCarrito = () => {
	const contenedor = document.getElementById("carrito-contenedor"); // Captura contenedor que está dentro del modal carrito 
	contenedor.innerHTML = " ";

	carrito.forEach((obra) => {
		const div = document.createElement("div"); // Crea un nuevo div en su interior
		div.classList.add("productoEnCarrito"); // Le añade esta clase y pinta el modal con la info recibida del sweet alert (en el cual se pueden elegir funciones, precios, cantida de entradas - ver modal.js)

		div.innerHTML = `
            <p>${obra.titulo}</p>
            <p>$ ${obra.precio}</p>
            <p id=cantidad${obra.id}>Cantidad: ${obra.cantidad}</p>
            <button class="boton-eliminar" id="${obra.id}">X</button>           
        `;
		contenedor.appendChild(div);
	});
};

//Aquí recibimos la etiqueta button, que en el parámetro lo capturamos como "target", y utilizamos su id para hacer el findIndex. Luego borramos ese elemento del array con el splice. Para borrarlo del DOM se debe eliminar esa etiqueta del modal.

const eliminarObraCarrito = (target) => {
	const obra = carrito.findIndex((producto) => producto.id == target.id);
	carrito.splice(obra, 1);
	target.parentNode.remove(); // Remueve el padre del botón del modal, que es toda la fila del producto que tenemos en el modal
	actualizarTotalesCarrito(carrito);
};

const actualizarTotalesCarrito = (carrito) => { // Acá se revisa la cantidad seleccionada y se la multiplica por el precio
	const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
	const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
	pintarTotalesCarrito(totalCantidad, totalCompra); // Llamado a estas funciones 
	guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
	const contadorCarrito = document.getElementById("contador-carrito");
	const precioTotal = document.getElementById("precio-total");

	contadorCarrito.innerText = totalCantidad;
	precioTotal.innerText = totalCompra;
};

const guardarCarritoStorage = (carrito) => {
	localStorage.setItem("obrasCompradas", JSON.stringify(carrito));
};

pintarObraCarrito();
actualizarTotalesCarrito(carrito);