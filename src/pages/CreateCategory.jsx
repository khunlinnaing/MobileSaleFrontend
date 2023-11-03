import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryValidation from "./Validations";
import GenerateImage from "./auth/GenerateImage";
function CrateCategory() {
    const navigate = useNavigate();
    const [categoryError, setCategoryError] = useState({})
    const [base64Image, setBase64Image]= useState(null)
    const [category, SetCategory] = useState({
        name:'',
        type:'',
        amount:'',
        description:''
    });
    function BackHandler(e){
        e.preventDefault();
        navigate('/category')
    }
    function HandlerOnChangeCategory(e){
        SetCategory({...category, [e.target.name] : e.target.value})
    }
    
    const ImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            GenerateImage(file, (base64String) => {
                setBase64Image(base64String);
            });
            SetCategory({...category,file: '' })
        } else {
            setBase64Image(null)
            SetCategory({...category,file: 'please enter png and jpeg or jpg only' })
        }
    };
    function SubmitFormHandler(e){
        e.preventDefault();
        setCategoryError(CategoryValidation(category,'category'))
        
    }
    useEffect(() =>{
        console.log(categoryError)
        if(Object.keys(categoryError).length ===0 && ( category.name !=='' && category.type !=='' && category.amount !=='')){
            fetch('http://localhost:5000/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'token '+localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    UserId:localStorage.getItem('userid'),
                    Name: category.name,
                    Type: category.type,
                    Photo:base64Image,
                    Amout: category.amount,
                    Description:category.description
                }),
            })
            .then(response => response.json())
            .then(result => {
                if(result.status === 1){
                    navigate('/category')
                }else{
                    alert(result)
                }
            })
            .catch(error => {
                alert(error);
            });
        }
    },[categoryError])
    return (
        <div className="container px-4 border bg-light">
            <h2 className="text-center my-4">Create New Category</h2>
            { base64Image ? <div className="text-center"><img src={base64Image} width={200} height={200}/></div>: `` }
            <form className="my-4" onSubmit={SubmitFormHandler}>
            <span className="text-danger">*</span> is require field
                <div className="mb-3">
                    <label htmlFor="categoryImage" className="form-label">Image</label>
                    <input type="file" className="form-control" id="categoryImage" name="photo" onChange={ImageChangeHandler}/>
                    <p className="text-danger">
                        {
                            categoryError.file ? categoryError.file : ``
                        }
                    </p>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="categoryName" name="name" placeholder="Please enter your category name." onChange={(e) =>HandlerOnChangeCategory(e)}/>
                    <p className="text-danger">
                        {
                            categoryError.name ? categoryError.name : ``
                        }
                    </p>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryType" className="form-label">Category Type<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="categoryType" name="type" placeholder="Please enter your category type." onChange={(e) =>HandlerOnChangeCategory(e)}/>
                    <p className="text-danger">
                        {
                            categoryError.type ? categoryError.type : ``
                        }
                    </p>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryAmount" className="form-label">Category Amount<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="categoryAmount" name="amount" placeholder="Please enter your category Amount." onChange={(e) =>HandlerOnChangeCategory(e)}/>
                    <p className="text-danger">
                        {
                            categoryError.amount ? categoryError.amount : ``
                        }
                    </p>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryDescription" className="form-label" >Category Descriptions</label>
                    <textarea className="form-control" id="categoryDescription" rows="3" name="description" onChange={(e) =>HandlerOnChangeCategory(e)}></textarea>
                </div>
                <div className="row my-5">
                    <div className="col-lg-4">
                        <button className="btn bg-warning form-control" onClick={BackHandler}>Cancel</button>
                    </div>
                    <div className="col-lg-4">
                        <button className="btn btn-success form-control" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CrateCategory;