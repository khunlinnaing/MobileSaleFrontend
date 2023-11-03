import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MyComponent from "./auth/get";
import GenerateImage from './auth/GenerateImage'
import ProductValidation from "./Validations";
function ProductUpdate() {
    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [update, setupdate] = useState(false)
    const [producterror, setproductError]= useState('')
    const [categories, setCategories] = useState([])
    const [upProduct, setUpProduct] = useState({
        name: '',
        CategoryId:'',
        type: '',
        quantity: '',
        price: '',
        description: ''
    });
    async function getCategoryDatas() {
        const response = await fetch('http://localhost:5000/api/category/all',{
            headers: {
                'token': 'token '+localStorage.getItem('token'),
            }
        });
        const values = await response.json();
        if (values.status === 1) {
            upProduct.CategoryId=values.data[0]._id
            setCategories(values.data)
        }
    }
    const [UpdateProductError, setUpProductError] = useState({});
    const navigate = useNavigate();
    var values = MyComponent(id, 'http://localhost:5000/api/products/');

    const ImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            GenerateImage(file, (base64String) => {
                setImage(base64String);
            });
            setUpProduct({ ...upProduct, file: '' })
        } else {
            setImage(null)
            setUpProduct({ ...upProduct, file: 'please enter png and jpeg or jpg only' })
        }
    };

    function UpdateProductUpdateOhchange(e) {
        setUpProduct({ ...upProduct, [e.target.name]: e.target.value });
    }
    function UpdateProductHandler(e) {
        e.preventDefault();
        setUpProductError(ProductValidation(upProduct, 'products'));
        if(Object.keys(UpdateProductError).length ===0 && ( upProduct.name !=='' && upProduct.type !=='' && upProduct.amount !=='')){
            fetch('http://localhost:5000/api/products/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'token '+localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    UserId:localStorage.getItem('userid'),
                    CategoryId: upProduct.CategoryId,
                    Name: upProduct.name,
                    Type: upProduct.type,
                    Photo:image,
                    Price: upProduct.price,
                    Quantity: upProduct.quantity,
                    Description:upProduct.description
                }),
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status === 1){
                    navigate('/products')
                }else{
                    setproductError(result.error)
                }
            })
            .catch(error => {
                console.error(error);
            });
        }else{
            console.log("Something Error")
        }

    }

    useEffect(() => {
        getCategoryDatas()
        if (values.status === 1) {
            setImage(values.data.Photo)
            setUpProduct({
                ...upProduct,
                CategoryId: values.data.CategoryId,
                name: values.data.Name,
                quantity: values.data.Quantity,
                type: values.data.Type,
                price: values.data.Price,
                description: values.data.Description
            })
        }
    }, [values, UpdateProductError])
    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    {image ? <img src={image}
                                        alt="Sample photo" className="img-fluid" width={100 + "%"} height={100 + "%"}
                                    /> : ``
                                    }
                                </div>
                                <div className="col-xl-6">
                                    {
                                        !update ?
                                            <div className="card-body p-md-5 text-black">
                                                <h3 className="mb-5 text-uppercase">Detail By ({upProduct.name})</h3>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Name</td>
                                                            <td>{upProduct.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Category</td>
                                                            <td>{
                                                                 categories ?
                                                                 categories.map((catg) => {
                                                                     return (
                                                                         catg._id === upProduct.CategoryId ? <p key={catg._id}>{catg.Name}</p>:``
                                                                     )
                                                                 })
                                                                 : ``
                                                                }</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Type</td>
                                                            <td>{upProduct.type}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Number of {upProduct.name}</td>
                                                            <td>{upProduct.quantity}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Price</td>
                                                            <td>{upProduct.price}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <h5>Description</h5>
                                                <p>{upProduct.description}</p>
                                                <div className="d-flex justify-content-end pt-3">
                                                    <button className="btn bg-warning btn-lg ms-2" onClick={() => navigate('/products')}>Back</button>
                                                    <button className="btn btn-success btn-lg ms-2" onClick={() => setupdate(true)}>Update</button>
                                                </div>
                                            </div>
                                            :
                                            <form onSubmit={UpdateProductHandler} autoComplete="false">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase">Create Product</h3>
                                                    {
                                                        producterror ? <div className="alert alert-danger">{producterror}</div> : ``
                                                    }
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="profile">Photo</label>
                                                        <input type="file" id="profile" className="form-control form-control-lg" onChange={ImageChangeHandler} />
                                                        <p className="text-danger">{
                                                            UpdateProductError.file ? UpdateProductError.file : ``
                                                        }</p>
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="profile">Categories</label>
                                                        <select className="form-control" name="category" onChange={UpdateProductUpdateOhchange}>
                                                            {
                                                                categories ?
                                                                    categories.map((catg) => {
                                                                        return (
                                                                            catg._id === upProduct.CategoryId ? <option key={catg._id} defaultValue={catg._id} selected>{catg.Name}</option>: <option key={catg._id} defaultValue={catg._id}>{catg.Name}</option>
                                                                        )
                                                                    })
                                                                    : ``
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="name">Product Name</label>
                                                                <input type="text" id="name" className="form-control form-control-lg" name="name" onChange={UpdateProductUpdateOhchange} defaultValue={upProduct.name}/>
                                                                <p className="text-danger">{
                                                                    UpdateProductError.name ? UpdateProductError.name : ``
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="type">Product Type</label>
                                                                <input type="text" id="type" className="form-control form-control-lg" name="type" onChange={UpdateProductUpdateOhchange} defaultValue={upProduct.type}/>
                                                                <p className="text-danger">{
                                                                    UpdateProductError.type ? UpdateProductError.type : ``
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="amount">Product Price</label>
                                                                <input type="text" id="amount" className="form-control form-control-lg" name="price" onChange={UpdateProductUpdateOhchange} defaultValue={upProduct.price}/>
                                                                <p className="text-danger">{
                                                                    UpdateProductError.price ? UpdateProductError.price : ``
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="quantity">Number of {upProduct.name}</label>
                                                                <input type="text" id="quantity" className="form-control form-control-lg" name="CategoryId" onChange={UpdateProductUpdateOhchange} defaultValue={upProduct.quantity}/>
                                                                <p className="text-danger">{
                                                                    UpdateProductError.quantity ? UpdateProductError.quantity : ``
                                                                }</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12 mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label" htmlFor="name">Product Description</label>
                                                                <textarea className="form-control" rows={3} name="description" onChange={UpdateProductUpdateOhchange} defaultValue={upProduct.description}></textarea>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button className="btn bg-warning btn-lg ms-2" onClick={() => navigate('/products')}>Back</button>
                                                        <button type="submit" className="btn btn-success btn-lg ms-2">Submit</button>
                                                    </div>
                                                </div>
                                            </form>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProductUpdate;