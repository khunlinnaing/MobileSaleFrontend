import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MyComponent from "./auth/get";
import GenerateImage from './auth/GenerateImage'
import CategoryValidation from "./Validations";
function UpdateCategory() {
    const { id } = useParams()
    const [image, setImage] = useState(null)
    const [upCategory, setUpCategory] = useState({
        name:'',
        type:'',
        amount:'',
        description:''
    });
    const [UpdateCategoryError, setUpCategoryError] = useState({});
    const navigate= useNavigate();
    var values = MyComponent(id, 'http://localhost:5000/api/category/');

    const ImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            GenerateImage(file, (base64String) => {
                setImage(base64String);
            });
        } else {
            setImage(null)
            setUpCategory({...upCategory,file: 'please enter png and jpeg or jpg only' })
        }
    };

    function UpdateCategoryUpdateOhchange(e){
        setUpCategory({...upCategory,[e.target.name]: e.target.value});
    }
    function UpdateCategoryHandler(e){
        e.preventDefault();
        setUpCategoryError(CategoryValidation(upCategory,'category'));
        if(Object.keys(UpdateCategoryError).length ===0 && ( upCategory.name !=='' && upCategory.type !=='' && upCategory.amount !=='')){
            fetch('http://localhost:5000/api/category/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'token '+localStorage.getItem('token'),
                    
                },
                body: JSON.stringify({
                    UserId:localStorage.getItem('userid'),
                    Name: upCategory.name,
                    Type: upCategory.type,
                    Photo:image,
                    Amout: upCategory.amount,
                    Description:upCategory.description
                }),
            })
            .then(response => response.json())
            .then(result => {
                if(result.status === 1){
                    navigate('/category')
                }else{
                    console.log(result)
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
        if (values.status === 1) {
            setImage(values.data.Photo)
            setUpCategory({
                ...upCategory,
                name: values.data.Name,
                amount: values.data.Amout,
                type: values.data.Type,
                description: values.data.Description
            })
        }
    }, [values, UpdateCategoryError])
    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    {image ? <img src={image}
                                        alt="Sample photo" className="img-fluid" width={100+"%"}
                                    /> : ``
                                    }
                                </div>
                                <div className="col-xl-6">
                                    <form onSubmit={UpdateCategoryHandler} autoComplete="false">
                                        <div className="card-body p-md-5 text-black">
                                            
                                            <h3 className="mb-5 text-uppercase">Update ({upCategory.name})</h3>
                                            
                                            <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="profile">Photo</label>
                                                <input type="file" id="profile" className="form-control form-control-lg"  onChange={ImageChangeHandler}/>
                                                
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                    <label className="form-label" htmlFor="name">Category Name</label>
                                                        <input type="text" id="name" className="form-control form-control-lg" name="name" defaultValue={upCategory.name} onChange={(e) => UpdateCategoryUpdateOhchange(e)}/>
                                                        <p className="text-danger">{
                                                            
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="type">Category Type</label>
                                                        <input type="text" id="type" className="form-control form-control-lg" name="type" defaultValue={upCategory.type} onChange={UpdateCategoryUpdateOhchange}/>
                                                        <p className="text-danger">{
                                                            
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="amount">Category Amount</label>
                                                        <input type="text" id="amount" className="form-control form-control-lg" name="amount" defaultValue={upCategory.amount}  onChange={UpdateCategoryUpdateOhchange}/>
                                                        <p className="text-danger">{
                                                            
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="name">Category Description</label>
                                                        <textarea className="form-control" rows={3} name="description"  onChange={UpdateCategoryUpdateOhchange} defaultValue={upCategory.description}></textarea>
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end pt-3">
                                                <button className="btn bg-warning btn-lg ms-2" onClick={() => navigate('/category')}>Back</button>
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
export default UpdateCategory;