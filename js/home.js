const pintarProductosProgramacion = async () => {
  try {
    const contenedorProgramacion = document.getElementById("contenedor-programacion-actual");

  let row; // Inicializa row fuera del bucle forEach
  let contador = 0;

  const response = await fetch("../data/stock.json")
  const stock = await response.json()

  stock.forEach(obra => {
    if (contador === 0) {
          // Si contador es 0, crea una nueva fila
      row = document.createElement('div');
      row.classList.add('row', 'm-2');
    }

    // Crear una columna para cada card
    const col = document.createElement('div');
    col.classList.add('col-md-6');

        // Contenido de la card
    col.innerHTML = `
         <h2 class="wow fadeInLeft" data-wow-duration="2s">${obra.dia}</h2>
         <div class="card mb-3" style="max-width: 660px;">
                  
          <div class="row g-0">
           <div class="col-md-4">
            <a href="${obra.link}" target="_blank">
               <img src="${obra.img}" class="img-fluid rounded-start m-1" alt="${obra.alt}">
            </a>              
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title text-sm-start text-md-start text-lg-start">${obra.titulo}</h3>
                <p class="card-text text-sm-start text-md-start">${obra.sinopsis.replace(/\n/g, '<br>')}</p>
                  <button id= ${obra.id} class="btn button-animation agregar">ENTRADAS</button>
              </div>
            </div>
           </div>
          </div>
                `;

      // Agregar la columna a la fila actual
    row.appendChild(col);

    contador++;

    if (contador === 2) {
       // Si contador llega a 2, agrega la fila actual al contenedor
       contenedorProgramacion.appendChild(row);
       contador = 0; // Reinicia el contador
      }

    });
   // Agregar la última fila con las obras restantes (si las hay)
    if (contador > 0) {
      contenedorProgramacion.appendChild(row);
     }

    modalBtnEntradas();
    
  } catch (error) {
    console.log(error)
  }  
}

// Llamada a pintarProductosProgramacion después de que el DOM se haya cargado
document.addEventListener('DOMContentLoaded', pintarProductosProgramacion);