//fetch
export const fetchProducts = async() => {
  let answer = await fetch('./js/products.json')
  return answer.json()
  
}

fetchProducts()