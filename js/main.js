import { fetchProducts } from "./stock.js";

//eventos y variables para abrir el carrito
const cartOpen = document.getElementById('btnCart');
const cartClose = document.getElementById('cartClose')

const cartContainer = document.getElementsByClassName('cart-container')[0]
const cart = document.getElementsByClassName('cart')[0]

cartOpen.addEventListener('click', ()=> {
  cartContainer.classList.toggle('cart-active')
})

cartClose.addEventListener('click', ()=> {
  cartContainer.classList.toggle('cart-active')
})

cartContainer.addEventListener('click', ()=> {
  cartClose.click()
})

cart.addEventListener('click', (e) => {
  e.stopPropagation()
})

//carrito

let buyingCart = [] //recibe la informacion desde la funcion addToCart

const productsContainer = document.getElementById('productsContainer');
const cartCont = document.getElementById('cartCont');

/* const btnFinish = document.getElementById('finish') todavía no tiene uso*/

const cartCounter = document.getElementById('cartCounter');
const totalPrice = document.getElementById('totalPrice');

let products;

const showProducts = async() => {
  
    products = await fetchProducts()

    productsContainer.innerHTML = ""

    products.forEach(el => {
      //desestructuración
      let { imagen, nombre, precio, id} = el

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
          addToCart(el.id, products);
          //alert de la libreria sweetalert que sale cada vez que agregas un producto al carrito
          Swal.fire({
            icon: 'success',
            title: 'Agregado!',
            text: 'Producto agregado al carrito satisfactoriamente!',
          })
    })
    })
}

showProducts()

function addToCart(id, products) {
    let alreadyExists = buyingCart.find(e => e.id == id)
    //si ya existe se modifica la cantidad del mismo
    if(alreadyExists){
        alreadyExists.quantity = alreadyExists.quantity + 1
        document.getElementById(`quantity${alreadyExists.id}`).innerHTML = `<p id="quantity${alreadyExists.id}">Cantidad: ${alreadyExists.quantity}</p>`
        //se guarda en el local storage
        localStorage.setItem('buyingCart', JSON.stringify(buyingCart))
        updateCart()
    }else{
      //sino la cantidad se modifica a 1
      let addProduct = products.find(ele => ele.id === id)
      addProduct.quantity = 1
      buyingCart.push(addProduct)
      updateCart()
      showCart(addProduct)
    }
  
}

function showCart(addProduct) {
    // muestra los productos en el carrito
    let productsCard = document.createElement('div')
    productsCard.classList.add('productInCart')
    productsCard.innerHTML =`<p>${addProduct.nombre}</p>
                <p>Precio: $${addProduct.precio}</p>
                <p id="quantity${addProduct.id}">Cantidad: ${addProduct.quantity}</p>
                <button id="delete${addProduct.id}" class="btn-delete"><img src="images/basura.png" alt="eliminar" width="15px"></button>`
    cartCont.appendChild(productsCard)

    let btnDelete= document.getElementById(`delete${addProduct.id}`)
    //permite borrar productos
    btnDelete.addEventListener('click',()=>{
        if (addProduct.quantity === 1) {
          //si tengo un producto solo me lo borra del carrito
            btnDelete.parentElement.remove()
            buyingCart = buyingCart.filter(item => item.id !== addProduct.id)
            //se guarda en el local storage
            localStorage.setItem('buyingCart', JSON.stringify(buyingCart))
            updateCart()
        } else {
          //si tengo mas de un solo producto que borre solo 1
          addProduct.quantity = addProduct.quantity - 1
          document.getElementById(`quantity${addProduct.id}`).innerHTML = `<p id="quantity${addProduct.id}">Cantidad: ${addProduct.quantity}</p>`
          //se guarda en el local storage
          localStorage.setItem('buyingCart', JSON.stringify(buyingCart))
          updateCart()
        }
    })
    localStorage.setItem('buyingCart', JSON.stringify(buyingCart))
}

function updateCart (){
    //resultado del total segun la cantidad de productos
  cartCounter.innerText = buyingCart.reduce((acc,el)=> acc + el.quantity, 0)
  totalPrice.innerText = buyingCart.reduce((acc,el)=> acc + (el.precio * el.quantity) , 0)                                                   
}


//se guarda el producto que se tiene en el carrito en el local storage
function cartLS() {
  if (localStorage.getItem('buyingCart')) {
    buyingCart = JSON.parse(localStorage.getItem('buyingCart'))
    buyingCart.forEach(function(item){
      showCart(item)
      updateCart()
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cartLS()
})



//elements


//methods


//events