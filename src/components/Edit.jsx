import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Sweet alert2
const MySwal = withReactContent(Swal)

//Editar valores
const Edit = () => {
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState('')
    const [ edad, setEdad ] = useState(0)
    const [ direccion, setDireccion ] = useState('')
    const [ telefono, setTelefono ] = useState(0)
    const [ email, setEmail ] = useState('')
    const [ producto, setProducto ] = useState('')
    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
         //Validando inputs vacios 
    if (!nombre.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el nombre'
        })
        return 
    }

    if (!apellido.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el apellido'
        })
        return 
    }

    if (!edad.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese la edad'
        })
        return 
    }

    if (!direccion.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese la direccion'
        })
        return 
    }

    if (!telefono.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el telefono'
        })
        return 
    }

    if (!email.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el email'
        })
        return 
    }

    if (!producto.trim()) {
        MySwal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Por favor ingrese el producto'
        })
        return 
    }
        const lista = doc(db, "lista", id)
        const data = { 
            nombre: nombre, 
            apellido:apellido, 
            edad:edad,
            direccion:direccion,
            telefono: telefono, 
            email: email, 
            producto: producto
        }
        await updateDoc(lista, data)
        navigate('/')
    }

    const getListaById = async (id) => {
        const lista = await getDoc( doc(db, "lista", id) )
        if(lista.exists()) {
            //console.log(product.data())
            setNombre(lista.data().nombre)
            setApellido(lista.data().apellido)
            setEdad(lista.data().edad)
            setDireccion(lista.data().direccion)
            setTelefono(lista.data().telefono)
            setEmail(lista.data().email)
            setProducto(lista.data().producto)
            
            
        }else{
            console.log('El registro no existe')
        }
    }

    useEffect( () => {
        getListaById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Registro</h1>
                 <form onSubmit={update}>
                 <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>    

                    <div className='mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={ (e)=> setApellido(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div> 

                    <div className='mb-3'>
                        <label className='form-label'>Edad</label>
                        <input
                           value={edad}
                           onChange={ (e)=> setEdad(e.target.value)}
                           type="number"
                           className='form-control'
                           />
                    </div>

                    <div className = 'mb-3'>
                        <label className = 'form-label'>Direccion</label>
                        <input
                          value={direccion}
                          onChange={ (e)=> setDireccion(e.target.value)}
                          type="text"
                          className='form-control'
                        />

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Telefono</label>
                        <input
                            value={telefono}
                            onChange={ (e)=> setTelefono(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={ (e)=> setEmail(e.target.value)} 
                            type="email"
                            className='form-control'
                        />                 
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Producto</label>
                        <input
                            value={producto}
                            onChange={ (e)=> setProducto(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>
  
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                    <p></p>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

//Commit
export default Edit
