import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import GenerateImage from './auth/GenerateImage'
import ValidateProduct from "./Validations";
function CreateProduct() {
    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [createProductVal, setcreateProductVal] = useState({
        CategoryId: '',
        name: '',
        type: '',
        price: '',
        quantity: '',
        description: ''
    });
    const [createProductValError, setcreateProductValError] = useState({});
    const navigate = useNavigate();
    async function getProductDatas() {
        const response = await fetch('http://localhost:5000/api/category/all',{
            headers: {
                'token': 'token '+localStorage.getItem('token'),
            }
        });
        const values = await response.json();
        if (values.status === 1) {
            createProductVal.CategoryId=values.data[0]._id
            setCategories(values.data)
        }
    }

    const ImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            GenerateImage(file, (base64String) => {
                setImage(base64String);
                setcreateProductVal({...createProductVal,file: '' })
            });
        } else {
            setImage(null)
            setcreateProductVal({...createProductVal,file: 'please enter png and jpeg or jpg only' })
        }
    };

    function CreateProductOhchange(e) {
        setcreateProductVal({...createProductVal,[e.target.name]: e.target.value});
    }
    function CreateProductHandler(e) {
        e.preventDefault();
        setcreateProductValError(ValidateProduct(createProductVal, 'products'))
        
        if(Object.keys(createProductValError).length ===0 && ( createProductVal.name !=='' && createProductVal.type !=='' && createProductVal.price !=='')){
            fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'token '+localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    UserId:localStorage.getItem('userid'),
                    CategoryId: createProductVal.CategoryId,
                    Name: createProductVal.name,
                    Type: createProductVal.type,
                    Photo:image,
                    Price: createProductVal.price,
                    Quantity: createProductVal.quantity,
                    Description:createProductVal.description
                }),
            })
            .then(response => response.json())
            .then(result => {
                if(result.status === 1){
                    navigate('/products')
                }else{
                    setError(result.message)
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
        getProductDatas()
    }, [])
    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    {image ? <img src={image}
                                        alt="Sample photo" className="img-fluid" width={100 + "%"}
                                    /> : ``
                                    }
                                </div>
                                <div className="col-xl-6">
                                    <form onSubmit={CreateProductHandler} autoComplete="false">
                                        <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">Create Product</h3>
                                            {
                                                error ? <div className="alert alert-danger">{error}</div> : ``
                                            }
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="profile">Photo</label>
                                                <input type="file" id="profile" className="form-control form-control-lg" onChange={ImageChangeHandler} />
                                                <p className="text-danger">{
                                                    createProductValError.file ? createProductValError.file : ``
                                                }</p>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="profile">Categories</label>
                                                <select className="form-control" name="CategoryId" onChange={CreateProductOhchange}>
                                                    {
                                                        categories ? 
                                                            categories.map((catg) =>{
                                                                return(
                                                                    <option key={catg._id} value={catg._id}>{catg.Name}</option>
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
                                                        <input type="text" id="name" className="form-control form-control-lg" name="name" onChange={CreateProductOhchange} />
                                                        <p className="text-danger">{
                                                            createProductValError.name ? createProductValError.name : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="type">Product Type</label>
                                                        <input type="text" id="type" className="form-control form-control-lg" name="type" onChange={CreateProductOhchange} />
                                                        <p className="text-danger">{
                                                            createProductValError.type ? createProductValError.type : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="amount">Product Price</label>
                                                        <input type="text" id="amount" className="form-control form-control-lg" name="price" onChange={CreateProductOhchange} />
                                                        <p className="text-danger">{
                                                            createProductValError.price ? createProductValError.price : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="quantity">Number of Products</label>
                                                        <input type="text" id="quantity" className="form-control form-control-lg" name="quantity" onChange={CreateProductOhchange} />
                                                        <p className="text-danger">{
                                                            createProductValError.quantity ? createProductValError.quantity : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="name">Product Description</label>
                                                        <textarea className="form-control" rows={3} name="description" onChange={CreateProductOhchange} ></textarea>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end pt-3">
                                                <button className="btn bg-warning btn-lg ms-2" onClick={() => navigate('/products')}>Back</button>
                                                <button type="submit" className="btn btn-success btn-lg ms-2">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CreateProduct;