import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebase';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { async } from '@firebase/util';
const MySwal = withReactContent(Swal)

const Show = () => {
    //1-configuramos los hooks
    const [products, setProducts] = useState([])

    //2-referenciamos a la db de firestore
    const productsCollection = collection(db, "products")

    //3-funcion para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        //console.log(data.docs)
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        //console.log(products)
    }

    //4-funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }
    //5-funcion de confirmacion para sweet alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Remove the product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                //llamamos a la funcion para eliminar
                deleteProduct(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has beed deleted',
                    'success'
                )
            }
        })
    }
    //6-usamos useEffect
    useEffect(() => {
        getProducts()
    }, [])

    //7-devolvemos vista de nuestro componente
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((prod) => (
                                    <tr key={prod.id}>
                                        <td>{prod.description}</td>
                                        <td>{prod.stock}</td>
                                        <td>
                                            <Link to={`/edit/${prod.id}`} className='btn btn-light'><i className='fa-solid fa-pencil'></i></Link>
                                            <button onClick={() => { confirmDelete(prod.id) }} className='btn btn-danger'><i className='fa-solid fa-trash'></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show