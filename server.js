const express = require( 'express' )
const Contenedor = require( './productos' )
class Server
{
  constructor ()
  {
    this.app = express();
    this.db = new Contenedor( 'productos' )
    this.port = process.env.PORT || 8080;
    this.routes()
  }
  routes ()
  {
    this.app.get( "/", ( req, res ) =>
    {
      res.json( {
        url: {
          productos: "/productos",
          productoRandom: "/productoRandom",
        },
      } );
    } );
    this.app.get( '/productos', async ( req, res ) =>
    {
      const getAll = await this.db.getAll()
      res.send( getAll )
    } )

    this.app.get( '/productoRandom', async ( req, res ) =>
    {
      const getRandom = await this.db.randomProducts()
      res.send( getRandom )
    } )
  }

  listen ()
  {
    this.app.listen( this.port, () =>
    {
      console.log( `Servidor corriendo en el puerto ${ this.port }` )
    } )
  }
}

module.exports = Server