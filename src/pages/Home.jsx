import { useEffect, useState } from 'react';
import image1 from '../imges/images.png'
function Home() {
    const [productsval, setProductsVal] = useState([]);
    const [categoriesval, setCategoriesVal] = useState([])
    function BuyProduct(id){
        if(localStorage.length === 0){
            alert('please login first!')
        }
    }
    function CancelBuyProduct(id){
        if(localStorage.length === 0){
            alert('please login first!')
        }
    }

    async function getCategoriesDatas() {
        const response = await fetch('http://localhost:5000/api/category/home');
        const values = await response.json();
        console.log(values)
        if (values.status === 1) {
            setCategoriesVal(values.data)
        }
    }
    async function getProductDatas() {
        const response = await fetch('http://localhost:5000/api/products/home');
        const values = await response.json();
        if (values.status === 1) {
            setProductsVal(values.data)
        }
    }

    
    useEffect(() => {
        getProductDatas();
        getCategoriesDatas();
    }, [])
    return (
        <main>
            <div className='container-fluid'>
                <div className='row my-4'>
                    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class="active" aria-current="true"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item">
                                <img src={image1} class="bd-placeholder-img" width="25%" height="50%" />

                                <div class="container">
                                    <div class="carousel-caption text-start">
                                        <h1>Example headline.</h1>
                                        <p>Some representative placeholder content for the first slide of the carousel.</p>
                                        <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item active">
                                <img src={image1} class="bd-placeholder-img" width="25%" height="50%" />

                                <div class="container">
                                    <div class="carousel-caption">
                                        <h1>Another example headline.</h1>
                                        <p>Some representative placeholder content for the second slide of the carousel.</p>
                                        <p><a class="btn btn-lg btn-primary" href="#">Learn more</a></p>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src={image1} class="bd-placeholder-img" width="25%" height="50%" />

                                <div class="container">
                                    <div class="carousel-caption text-end">
                                        <h1>One more for good measure.</h1>
                                        <p>Some representative placeholder content for the third slide of this carousel.</p>
                                        <p><a class="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row my-4 border py-4'>
                    <h1 className='text-center'>Categories</h1>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {
                            categoriesval.length != 0 ? categoriesval.map((category) => {
                                return (
                                    <div className="col">
                                        <div className="card h-100">
                                            <img src={category.Photo} className="card-img-top h-100 w-100"/>
                                            <div className="card-body">
                                                <h5 className="card-title">{category.Name}</h5>
                                                <p className="card-text">{category.Description}</p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row my-3">
                                                    <div className="col-lg-6 col-md-6">
                                                        <button className='btn bg-success text-white form-control' onClick={() => BuyProduct(category._id)}>Buy</button>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <button className='btn bg-danger text-white form-control' onClick={() => CancelBuyProduct(category._id)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h1>No Categories Data</h1>
                        }
                    </div>
                </div>

                <div className='row my-4 border py-4'>
                    <h1 className='text-center'>Products</h1>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        {
                            productsval.length != 0 ? productsval.map((product) => {
                                return (
                                    <div className="col">
                                        <div className="card h-100">
                                            <img src={product.Photo} className="card-img-top h-100 w-100"/>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.Name}</h5>
                                                <p className="card-text">{product.Description}</p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row my-3">
                                                    <div className="col-lg-6 col-md-6">
                                                        <button className='btn bg-success text-white form-control' onClick={() => BuyProduct(product._id)}>Buy</button>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <button className='btn bg-danger text-white form-control' onClick={() => CancelBuyProduct(product._id)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h1>No Product Data</h1>
                        }
                    </div>
                </div>
                <div className='row'>

                </div>
            </div>
        </main>
    )
}
export default Home;