import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { async } from '@firebase/util';

const MySwal = withReactContent(Swal)

const Edit = () => {
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState(0)

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "products", id)
    const data = { description: description, stock: stock }
    await updateDoc(product, data) //updateDoc es una funcion de firestore
    navigate("/")
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id))
    if (product.exists()) {
      console.log(product.data())

      setDescription(product.data().description)
      setStock(product.data().stock)

    } else {
      MySwal.fire({
        title: "<strong>That product doesn't exist <u></u></strong>",
        icon: 'info',
        showCloseButton: true,

        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i>',
        confirmButtonAriaLabel: 'Thumbs up, great!',

      })
    }
  }

  useEffect(() => {
    getProductById(id)
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Edit Product</h1>

          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Stock</label>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type='number'
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-primary'>Update</button>


          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit