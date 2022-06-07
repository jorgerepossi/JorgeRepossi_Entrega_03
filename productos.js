
const fs = require( 'fs' )

const baseProd = JSON.parse( fs.readFileSync( './productos.json' ) )

class Contenedor
{
  constructor ( prods )
  {
    this.productsArray = prods
  }

  async write ( params )
  {
    const newProducts = JSON.stringify( params, null, 2 )
    await fs.promises.writeFile( 'productos.json', newProducts )
  }

  async save ( prodObject )
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( 'productos.json' ) )
      const products = data
      prodObject.id = Date.now() + 1
      products.push( prodObject )
      await fs.promises.writeFile(
        'productos.json',
        JSON.stringify( products, null, 2 )
      )
    } catch ( error ) {
      console.log( error )
    }
  }

  getById ( idNumber )
  {
    const product = this.productsArray.find(
      ( product ) => product.id === idNumber
    )
    if ( product ) {
      console.log( product )
    } else {
      console.log( 'The product does not exist' )
    }
  }

  async getAll ()
  {
    try {
      const data = await fs.promises.readFile( 'productos.json' )
      const products = JSON.parse( data )
      if ( products.length ) {
        return products
      } else {
        console.log( 'Not found products' )
      }
    } catch ( error ) {
      console.log( error )
    }
  }

  async deleteById ( idNumber )
  {
    try {
      const data = await fs.promises.readFile( 'productos.json' )
      const products = JSON.parse( data )
      const index = products.findIndex( ( prod ) =>
      {
        if ( prod.id === idNumber ) return true
        return false
      } )
      if ( index === -1 ) {
        console.log( 'The product does not exist' )
      } else {
        products.splice( index, 1 )
        this.write( products )
        console.log( `The product with the id: ${ idNumber } has been removed` )
      }
    } catch ( err ) {
      console.log( err )
    }
  }

  async deleteAll ()
  {
    try {
      this.write( [] )
      console.log( 'All items have been deleted ' )
    } catch ( err ) {
      console.log( err )
    }
  }

  async createProdTxt ()
  {
    try {
      await fs.promises.writeFile(
        'products.txt',
        JSON.stringify( this.productsArray, null, 2 )
      )
      console.log( 'All products were exported!!' )
    } catch ( error ) {
      console.log( error )
    }
  }

  async randomProducts ()
  {
    const getAllProducts = await this.getAll()
    const random = Math.random() * getAllProducts.length
    const randProds = getAllProducts[ Math.floor( random ) ]
    return randProds
  }
}

const productos = new Contenedor( baseProd )

const newProduct_1 = {
  title: 'Apple Watch Series 7',
  price: 70000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s7-digitalmat-gallery-2-202203_GEO_ES?wid=364&hei=333&fmt=png-alpha&.v=1646033515724'
}
const newProduct_2 = {
  title: 'iPhone 12',
  price: 150000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone12-digitalmat-gallery-2-202111?wid=364&hei=333&fmt=png-alpha&.v=1635178709000'
}
const newProduct_3 = {
  title: 'iMac de 24 pulgadas',
  price: 230000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/imac24-digitalmat-gallery-2-202111?wid=364&hei=333&fmt=png-alpha&.v=1635186198000'
}
const newProduct_4 = {
  title: 'Apple TV 4K',
  price: 80000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-tv-4k-hero-select-202104?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1619139498000'
}
const newProduct_5 = {
  title: 'iPhone 11',
  price: 80000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-digitalmat-gallery-2-202111?wid=364&hei=333&fmt=png-alpha&.v=1635178712000'
}
productos.getAll()
// productos.getById(2)
// productos.save(newProduct_4)
// productos.createProdTxt()
// productos.deleteById( 1648771802819 )
// productos.deleteAll()

module.exports = Contenedor
