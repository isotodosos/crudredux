import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//////////////////////////// crear nuevos productos  ///////////////////////////////

export function crearNuevoProductoAction(producto) {
    return async (dispatch) =>{

        dispatch(agregarProducto())

        try {
            // insertamos en la api..
            await clienteAxios.post('hola', producto)
            // si todo sale bien actualizamos el state...
            dispatch(agregarProductoExito(producto))

            //creamos una alerta con sweetalert2
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            
            // si hay un error actualizamos el state...
            dispatch(agregarProductoError(true))
                        
            //creamos una alerta con sweetalert2
            Swal.fire({
                icon : 'error',
                title : 'Hubo un error',
                text : 'Hubo un error, intentalo de nuevo'
            });
        }
    }
}

// cargando....
const agregarProducto = () => ({
    type : AGREGAR_PRODUCTO,
    payload : true
})

// si el producto se guarda en la bbdd...
const agregarProductoExito = producto => ({
    type : AGREGAR_PRODUCTO_EXITO,
    payload : producto
})

// si hubo un error al guardar en la bbdd...
const agregarProductoError = estado => ({
    type : AGREGAR_PRODUCTO_ERROR,
    payload : estado
    
})


/////////////////////////////////// descargar productos desde la bbdd ////////////////////////////

export function obtenerProductosAction() {
    return async (dispatch) => {

        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios.get('productos');
            
            // si todo sale bien actualizamos el state...
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            
            // si hay un error actualizamos el state...
            dispatch(descargaProductosError())
        }
    }
}

// cargando....
const descargarProductos = () => ({
    type : COMENZAR_DESCARGA_PRODUCTOS,
    payload : true
})

// si obtenemos los productos de la bbdd...
const descargaProductosExitosa = (productos) => ({
    type : DESCARGA_PRODUCTOS_EXITO,
    payload : productos
})

// si hubo un error al descargar los productos...
const descargaProductosError = () => ({
    type : DESCARGA_PRODUCTOS_ERROR,
    payload : true
    
})


//////////////////////////// Selecciona y elimina un producto ///////////////////////////////

export function borrarProductoAction(id) {
    return async (dispatch) => {

        dispatch(obtenerProductoEliminar(id))
        try {
            clienteAxios.delete(`productos/${id}`);
            dispatch(eliminarProductoExito());
            Swal.fire(
                '¡Eliminado!',
                'Tu producto se ha eliminado.',
                'success'
            )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type : OBTENER_PRODUCTO_ELIMINAR,
    payload : id
})

const eliminarProductoExito = () => ({
    type : PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type : PRODUCTO_ELIMINADO_ERROR,
    payload : true
})


////////////////////////////  Colocar producto en edicion  //////////////////////////////

export function obtenerProductoEditar(producto) {
    
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = (producto) => ({
    type : OBTENER_PRODUCTO_EDITAR,
    payload : producto
})


////////////////////////////  edita un producto en la api y en el state  //////////////////////////////

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto())

        try {
            await clienteAxios.put(`productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto));
        } catch (error) {
            dispatch( editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type : COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = (producto) => ({
    type : PRODUCTO_EDITADO_EXITO,
    payload : producto
})

const editarProductoError = () => ({
    type : PRODUCTO_EDITADO_ERROR
})