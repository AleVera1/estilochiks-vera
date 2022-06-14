const products = [
  {
    "Id": 1,
    "Nombre": "Collar de Piedras Doradas",
    "Descripcion": "collar",
    "Precio": 2250,
  },
  {
    "Id": 2,
    "Nombre": "Collar de Piedras Blancas",
    "Descripcion": "collar",
    "Precio": 2300,
  },
  {
    "Id": 3,
    "Nombre": "Collar de Piedras Azulmarino",
    "Descripcion": "collar",
    "Precio": 2275,
  },
  {
    "Id": 4,
    "Nombre": "Collar de Piedras Grises",
    "Descripcion": "collar",
    "Precio": 2200,
  },
  {
    "Id": 5,
    "Nombre": "Collar de Piedras Negras",
    "Descripcion": "collar",
    "Precio": 2250,
  },
  {
    "Id": 6,
    "Nombre": "Collar de Piedras Doradas Oscuras",
    "Descripcion": "collar",
    "Precio": 2150,
  },
  {
    "Id": 7,
    "Nombre": "Collar de Piedras Marrones",
    "Descripcion": "collar",
    "Precio": 2400,
  },
  {
    "Id": 8,
    "Nombre": "Collar de Piedras Rosas",
    "Descripcion": "collar",
    "Precio": 2100,
  },
  {
    "Id": 9,
    "Nombre": "Collar de Piedras Azules",
    "Descripcion": "collar",
    "Precio": 2300,
  },

]

function mostrar(mensaje){
  console.log(mensaje)
}

let cart = []

function addToCart(id) {
  let productFound = products.find(product => product.Id === id)
  let productCart = cart.find(product => product.Id === id)
  if (productCart === undefined && productFound !== undefined) {
      alert("El producto " + productFound.Nombre + " fue agregado a su carrito.")
      cart.push({
          Cantidad: 1,
          ...productFound
      })
  }
  else {
      const prodIndex = cart.findIndex((prod => prod.Id === id))
      cart[prodIndex].Cantidad = cart[prodIndex].Cantidad + 1
      cart[prodIndex].Precio = cart[prodIndex].Precio + productFound.Precio
  }
}

  let nombre = prompt("Ingrese su nombre porfavor.")

  const saludar = (nombre) => {
      alert("Bienvenido: " + nombre)
  }
  saludar(nombre)
  checkOptions()


function checkOptions() {
  let idProduct = Number(prompt("Ingrese el numero producto que desea comprar:" + "\n" + products.map((product) => ` \n ${product.Id} - ${product.Nombre}`)))
  if(!isNaN(idProduct)) {
    addToCart(idProduct)
    option = prompt("Si desea seguir comprando, introduzca: si" + "\n" + "Para finalizar introduzca: salir")
  }
  else {
    alert("Ingresaste un caracter erroneo. Se recargara la página.")
    location.reload()
  }

  while (nombre !== "salir") {
    if (option === "si") {
      idProduct = Number(prompt("Ingrese el numero producto que desea comprar:" + "\n" + products.map((product) => ` \n ${product.Id} - ${product.Nombre}`)))
      
      if(!isNaN(idProduct)) {
        addToCart(idProduct)
        option = prompt("Si desea seguir comprando, introduzca: si" + "\n" + "Para finalizar introduzca: salir")
      }
      else {
        mostrar("No ingresaste un número. Se te devolvera a la página principal.")
        break
      }
    }
    else if (option === "salir") {
        alert("Gracias por su compra. Su recibo es: " + "\n" +
            "Productos :" + "\n" 
            + cart.map((product) => product.Cantidad > 0
                ? ` \n Cantidad: ${product.Cantidad} - Nombre: ${product.Nombre} - Precio: ${(product.Precio  )}`
                : ` \n No seleccionaste ningun producto.`)
            + "\n" +
            " Precio Total: " + cart.reduce((acc, { Precio }) => acc + Precio, 0))
        break
    }
  }
}

