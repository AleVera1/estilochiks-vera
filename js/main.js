const products = [
  {
    id: 1,
    nombre: "Collar de Piedras Doradas",
    precio: 2250,
    imagen: 'images/collar1-2/IMG_2003.JPG',
  },
  {
    id: 2,
    nombre: "Collar de Piedras Blancas",
    precio: 2300,
    imagen: 'images/collar2-2/IMG_2054.JPG',
  },
  {
    id: 3,
    nombre: "Collar de Piedras Azulmarino",
    precio: 2275,
    imagen: 'images/collar4-2/IMG_2019.JPG',
  },
  {
    id: 4,
    nombre: "Collar de Piedras Grises",
    precio: 2200,
    imagen: 'images/collar5-2/IMG_1953.JPG',
  },
  {
    id: 5,
    nombre: "Collar de Piedras Negras",
    precio: 2250,
    imagen: 'images/collar10-2/IMG_1949.JPG',
  },
  {
    id: 6,
    nombre: "Collar de Piedras Doradas Oscuras",
    precio: 2150,
    imagen: 'images/collar6-2/IMG_2076.JPG',
  },
  {
    id: 7,
    nombre: "Collar de Piedras Marrones",
    precio: 2400,
    imagen: 'images/collar7-2/IMG_2047.JPG',
  },
  {
    id: 8,
    nombre: "Collar de Piedras Rosas",
    precio: 2100,
    imagen: 'images/collar8-2/IMG_2030.JPG',
  },
  {
    id: 9,
    nombre: "Collar de Piedras Azules",
    precio: 2300,
    imagen: 'images/collar3-2/IMG_1978.JPG',
  },
]

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

showProducts(products)

function showProducts(products) {

    productsContainer.innerHTML = ""

    products.forEach(el => {
      //se crea un div para cada producto
      let productsCard = document.createElement('div')
      productsCard.className = 'product'
      
      productsCard.innerHTML = ` <div class="card text-black card-color" style="width: 18rem;">
                              <div class="card-image">
                                  <img src="${el.imagen}" width="500px" class="rounded shadow-drop-2-center animate__animated animate__fadeIn img-fluid">
                                  <span class="card-title text-center pt-3">${el.nombre}</span>
                                  
                              </div>
                              <div class="card-content">
                                  <p class= "text-center"> $ ${el.precio}</p>
                                  <a id="btn${el.id}" class="btn btn-dark buy--btn text-center" role="button">Agregar al Carrito</a>
                              </div>
                          </div>
                        </div>`

      productsContainer.appendChild(productsCard)
      
      let btnAdd = document.getElementById(`btn${el.id}`)
      //boton para agregar al carrito
      btnAdd.addEventListener('click',()=>{
          addToCart(el.id);
    })
    })
}

function addToCart(id) {
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
      console.log(item)
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