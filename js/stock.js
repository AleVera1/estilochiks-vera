//fetch
export const fetchProducts = async() => {
  let answer = await fetch('./js/products.json')
  return answer.json()
  
}

fetchProducts()
/* showProducts(products)

function showProducts(products) {

    productsContainer.innerHTML = ""

    products.forEach(el => {
      //desestructuración
      let imagen = el.imagen;
      let nombre = el.nombre;
      let precio = el.precio;
      let id = el.id;

      //se crea un div para cada producto
      let productsCard = document.createElement('div')
      productsCard.className = 'product'
      
      productsCard.innerHTML = ` <div class="card text-black card-color" style="width: 18rem;">
                              <div class="card-image">
                                  <img src="${imagen}" width="500px" class="rounded shadow-drop-2-center animate__animated animate__fadeIn img-fluid">
                                  <span class="card-title text-center pt-3">${nombre}</span>
                                  
                              </div>
                              <div class="card-content">
                                  <p class= "text-center"> $ ${precio}</p>
                                  <a id="btn${id}" class="btn btn-dark buy--btn text-center" role="button">Agregar al Carrito</a>
                              </div>
                          </div>
                        </div>`

      productsContainer.appendChild(productsCard)
      
      let btnAdd = document.getElementById(`btn${el.id}`)
      //boton para agregar al carrito
      btnAdd.addEventListener('click',()=>{
          addToCart(el.id);
          //alert de la libreria sweetalert que sale cada vez que agregas un producto al carrito
          Swal.fire({
            icon: 'success',
            title: 'Agregado!',
            text: 'Producto agregado al carrito satisfactoriamente!',
          })
    })
    })
} */