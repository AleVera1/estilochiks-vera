const productsPay = document.getElementById('productspay')
const totalPrice = document.getElementById('totalPrice');
const btnPay = document.getElementById('pay')

btnPay.addEventListener('click', (e)=> {
  //boton para finalizar la compra
  e.preventDefault()
  Swal.fire({
    backdrop:false,            
    title: "Esta seguro que desea finalizar su compra?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, estoy seguro",
    cancelButtonText: "No, quiero salir",
    allowOutsideClick: false
}).then((result) => {
    if (result.isConfirmed) {
        Swal.fire({
            backdrop: false,            
            title: "Compra finalizada",
            icon: "success",
            text: "Compra Finalizada! Te llegara en los proximos días a tu dirección.",
            showConfirmButton: false,
            allowOutsideClick: false
        })
        setTimeout(() => {
            localStorage.clear()
            window.location.replace('/estilochiks-vera/index.html');
        }, 4000)
    }
})
})


function renderCart() {
  //busca los productos que habia en el carrito para renderizarlos
  if (localStorage.getItem('buyingCart')) {
    buyingCart = JSON.parse(localStorage.getItem('buyingCart'))
    buyingCart.forEach(function(item){
      let productsCard = document.createElement('tr')
      productsCard.innerHTML =`<td class="padding-table">${item.nombre}</td>
                <td align="center" class="padding-table">$${item.precio}</td>
                <td align="center" class="padding-table" id="quantity${item.id}">${item.quantity}</td>`
      productsPay.appendChild(productsCard)
      totalPrice.innerText = buyingCart.reduce((acc,el)=> acc + (el.precio * el.quantity) , 0)    
    })
  }
}

function updateCart (){
  //resultado del total segun la cantidad de productos
totalPrice.innerText = buyingCart.reduce((acc,el)=> acc + (el.precio * el.quantity) , 0)                                                   
}

document.addEventListener('DOMContentLoaded', () => {
  if(window.location.pathname === '/estilochiks-vera/pages/finalizarCompra.html'){
    renderCart()
  }
})
