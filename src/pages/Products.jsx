import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PaginationExample from './Paggination'
import Content from '../components/context';
function Product() {
    const [datas, setDatas] = useState([])
    const { page, setTotal } = useContext(Content);
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    async function getCategoryDatas() {
        const response = await fetch('http://localhost:5000/api/category/all', {
            headers: {
                'token': 'token ' + localStorage.getItem('token'),
            }
        });
        const values = await response.json();
        if (values.status === 1) {
            setCategories(values.data)
        }
    }
    async function getProductDatas() {
        const response = await fetch('http://localhost:5000/api/products?page=' + page, {
            headers: {
                'token': 'token ' + localStorage.getItem('token'),
            }
        });
        const values = await response.json();
        if (values.status === 1) {
            setDatas(values.data)
            setTotal(values.total)
        }
    }
    function createCategory() {
        console.log('create')
        navigate('/products/create')
    }
    function updateProduct(id) {
        navigate('/products/update/' + id)
    }
    function deleteProduct(id) {
        fetch('http://localhost:5000/api/products/' + id, {
            method: 'Delete',
            headers: {
                'token': 'token ' + localStorage.getItem('token'),
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 1) {
                    window.location.reload();
                } else {
                    console.log(result)
                }

            })
            .catch(error => {
                console.error(error);
            });
    }
    useEffect(() => {
        getProductDatas();
        getCategoryDatas();
    }, [page]);
    return (
        <div className="container-fluid">
            {
                categories.length !== 0 ?
                    <main>
                        <div className="container">
                            <h3 className="text-center my-4">Products Lists</h3>
                            {
                                localStorage.getItem('role') != 1 ?
                                <div className="row ml-4">
                                <button className="btn btn-success w-25" onClick={createCategory}>+Add new categories</button>
                            </div>: ``}
                        </div>
                        <div className="container my-4">
                            <div className="row">
                                {
                                    datas.map((data) => {
                                        return (
                                            <div className="card mx-2 my-3" style={{ width: 18 + 'rem', padding: 0 }} key={data._id}>
                                                <img src={data.Photo} className="card-img-top" width={100 + "%"} height={100 + "%"} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{data.Name}</h5>
                                                    <table className="table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Type</td>
                                                                <td>{data.Type}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Price</td>
                                                                <td><strong>$</strong>{data.Price}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Number Of <strong>{data.Name}</strong></td>
                                                                <td>{data.Quantity}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p className="card-text">{data.Description}</p>
                                                </div>
                                                <div className="card-footer">
                                                    {
                                                        localStorage.getItem('role') != 1 ?
                                                            <div>
                                                                <button className='btn btn-primary text-white' onClick={() => updateProduct(data._id)}>Detail</button>
                                                                <button className='btn btn-success text-white' onClick={() => updateProduct(data._id)}>Update</button>
                                                                <button className='btn btn-danger text-white' onClick={() => deleteProduct(data._id)} >Delete</button>
                                                            </div> : ``}
                                                    <div className="row my-3">
                                                        <div className="col-lg-6 col-md-6">
                                                            <button className='btn bg-success text-white form-control'>+</button>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <button className='btn bg-danger text-white form-control'>-</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <PaginationExample />
                        </div>
                    </main>
                    : `The is no data`
            }
        </div>
    )
}
export default Product;