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

//eventos y variables para finalizar la compra

const btnFinish = document.getElementById('finish');

btnFinish.addEventListener('click', (e)=> {
  if(buyingCart.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El carrito esta vació.',
    })
  }else{
    Swal.fire({
    backdrop:false,            
    title: "Esta seguro que desea finalizar su compra?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, estoy seguro",
    cancelButtonText: "No, quiero seguir comprando",
    allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire({
              backdrop: false,            
              title: "Finalizando Compra",
              icon: "success",
              text: "Esta siendo redirigido a otro sitio para finalizar su compra",
              showConfirmButton: false,
              allowOutsideClick: false
          })
          setTimeout(() => {
              window.location.replace('/estilochiks-vera/pages/finalizarCompra.html');
          }, 2000)
      }
    })
  }
})


//carrito

let buyingCart = [] //recibe la informacion desde la funcion addToCart

const productsContainer = document.getElementById('productsContainer');
const cartCont = document.getElementById('cartCont');


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
          //alert de la libreria Toastify que sale cada vez que agregas un producto al carrito
          Toastify({
            text: 'Producto agregado al carrito satisfactoriamente!',
            duration: 1000
          }).showToast();
    })
    })
}

showProducts()

function addToCart(id, products) {
    let alreadyExists = buyingCart.find(e => e.id == id)
    //si ya existe se modifica la cantidad del mismo
    if(alreadyExists){
        alreadyExists.quantity = alreadyExists.quantity + 1
        document.getElementById(`quantity${alreadyExists.id}`).innerHTML = `<td id="quantity${alreadyExists.id}">${alreadyExists.quantity}</td>`
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
    let productsCard = document.createElement('tr')
    productsCard.setAttribute("id", addProduct.id) 
    productsCard.innerHTML =`<td class="padding-table">${addProduct.nombre}</td>
                <td align="center" class="padding-table">$${addProduct.precio}</td>
                <td align="center" class="padding-table" id="quantity${addProduct.id}">${addProduct.quantity}</td>
                <td align="center" class="padding-table"><button id="delete${addProduct.id}" class="btn-delete col-md-1"><img src="images/basura.png" alt="eliminar" width="15px"></button></td>`
    cartCont.appendChild(productsCard)

    let btnDelete = document.getElementById(`delete${addProduct.id}`)
    //permite borrar productos 
    btnDelete.addEventListener('click',()=>{
        if (addProduct.quantity === 1) {
          //si tengo un producto solo me lo borra del carrito
            document.getElementById(addProduct.id).remove()
            buyingCart = buyingCart.filter(item => item.id !== addProduct.id)
            //se guarda en el local storage
            localStorage.setItem('buyingCart', JSON.stringify(buyingCart))
            updateCart()
        } else {
          //si tengo mas de un solo producto que borre solo 1
          addProduct.quantity = addProduct.quantity - 1
          document.getElementById(`quantity${addProduct.id}`).innerHTML = `<td align="center" class="padding-table" id="quantity${addProduct.id}">${addProduct.quantity}</td>`
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

//
document.addEventListener('DOMContentLoaded', () => {
  cartLS()
})



//elements


//methods


//events