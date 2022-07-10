const { Router } = require('express')
const router = Router()
const { getProduct, postProduct, borrarProd, modificarProd} = require('../public/controllers/controllerProd')
const { postCarrito, insertarProductoIdCart, verCarrito, borrarCarrito, borrarProductoCarrito  } = require('../public/controllers/controllerCart')

const auth = ( req, res, next ) => {
    const admin = true
    if (admin) {
        return next()
    } else {
        let messageError = {
            error: "-1",
            description: `ruta: ${req.url} metodo: ${req.method} no autorizado`
        }
        res.status(401).json(messageError)
    }
}

//Routers de los Productos
router.get( '/api/productos/:id?', getProduct )
router.post( '/api/productos', auth, postProduct )
router.put('/api/productos/:id', auth, modificarProd )
router.delete('/api/productos/:id', auth, borrarProd )

//Routers del Carrito
router.post('/api/carrito', postCarrito )
router.post('/api/carrito/:id/productos', insertarProductoIdCart )
router.get('/api/carrito/:id/productos', verCarrito )
router.delete('/api/carrito/:id', borrarCarrito )
router.delete('/api/carrito/:id/productos/:id_prod', borrarProductoCarrito )


module.exports = router