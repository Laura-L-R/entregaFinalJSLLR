const pintarObrasIndex = () => {
  const contenedorIndex = document.getElementById('contenedor-index'); // Se obtiene el contenedor (ya existente) al que se le quiere agregar el futuro elemento/etiqueta creado

  const divIndex = document.createElement('div'); // Se crea dentro de ese contenedor, una etiqueta div que estará por fuera y englobará las 4 iteraciones del array (por el forEach ())
  divIndex.classList.add('container-fluid', 'my-4', 'row'); // se le agregan clases. Todas las iteraciones (4 imágenes) serán row

  fetch("../data/obrasPpales.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(obraPpal => { // Recién después se hace iterar al array que tiene el stock de obras ppales, porque lo que queremos que se repita la cantidad de veces cuyas obras hay (4) es la acción de agregar imágenes

              divIndex.innerHTML += ` 
                  <article class="col-sm-12 col-md-6 col-lg-3 mb-2">
                    <div class="card">
                      <a href="${obraPpal.link}" target="_blank">
                        <img src="${obraPpal.img}" class="card-img-top w-100" alt="${obraPpal.alt}">  
                      </a>                        
                    </div>
                  </article>
              `; // Se le asigna a esa etiqueta creada (que será un div con las clases container-fluid row my-4) este contenido, y se repetirá 4 veces 
          });

      })

  contenedorIndex.appendChild(divIndex); // Sumamos el div creado al contenedor obtenido
}

pintarObrasIndex(); // Llamamos a la función
