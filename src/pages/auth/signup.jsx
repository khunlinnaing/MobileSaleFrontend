import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PasswordValidation from "./passwordValidation";
import SignUpValidate from "./SignUpValidate";
import convertImageToBase64 from './GenerateImage';
function SignUp() {
    const [base64Image, setBase64Image] = useState(null);
    const [passError, setPassError] = useState({});
    const [signupError, setSignupError]= useState({})

    const [signup, setSignUpd] = useState({
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        mobile:'',
        address:'',
        gender:'',
        birthday:''
    });
    const [password, setPassword] = useState({
        pass:'',
        confirmpass:''
    })
    function OnChangeHandler(e){
        setSignUpd({...signup, [e.target.name]: e.target.value})
    }

    function onChangePassword(e){
        setPassword({ ...password, [e.target.name]: e.target.value})
    }
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            convertImageToBase64(file, (base64String) => {
                setBase64Image(base64String);
            });
        } else {
            setSignUpd({...signup,file: 'please enter png and jpeg or jpg only' })
        }
    };
    function CreateUserHandler(e){
        e.preventDefault();
        setSignupError(SignUpValidate(signup))
        setPassError(PasswordValidation(password))
    }

    useEffect(() =>{
        if(Object.keys(signupError).length === 0 && Object.keys(passError).length === 0 && (signup.firstname !=="" && signup.lastname !=="" && signup.email !==""&& signup.phone !=="" && signup.address !=="" && signup.gender !=="" && signup.birthday !=="" && password.pass !=="" && password.confirmpass !=="")){
            fetch('http://localhost:5000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "firstName": signup.firstname,
                        "lastName": signup.lastname,
                        "email": signup.email,
                        "phone": signup.phone, 
                        "mobile": signup.mobile, 
                        "address": signup.address, 
                        "birthday": signup.birthday, 
                        "profile": base64Image, 
                        "password": password.pass, 
                        "confirmpassword": password.confirmpass, 
                        "gender": signup.gender
                    }
                ),
            })
            .then(response => response.json())
            .then(result => {
                localStorage.setItem('email', signup.email)
                if(result.status === 1){
                    window.location.reload();
                    navigate('/setting')
                }else{
                    // setMessage(result.message)
                    console.log(result)
                }
                
            })
            .catch(error => {
                console.error(error);
            });
        }
    },[signupError, passError]);
    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo" className="img-fluid"
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <form onSubmit={CreateUserHandler} autoComplete="false">
                                        <div className="card-body p-md-5 text-black">
                                            
                                            <h3 className="mb-5 text-uppercase">registration form</h3>
                                            {
                                                base64Image ? <img src={base64Image} className="profile text-center my-4"/> : ``
                                            }
                                            <div className="form-outline mb-4">
                                                <input type="file" id="profile" className="form-control form-control-lg" onChange={handleImageChange}/>
                                                <label className="form-label" htmlFor="profile">Profile</label>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="firstname" className="form-control form-control-lg" name="firstname" onChange={(e) => OnChangeHandler(e)}/>
                                                        <label className="form-label" htmlFor="firstname">First name</label>
                                                        <p className="text-danger">{
                                                            signupError.firstname ? signupError.firstname : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="lastname" className="form-control form-control-lg" name="lastname" onChange={(e) => OnChangeHandler(e)}/>
                                                        <label className="form-label" htmlFor="lastname">Last name</label>
                                                        <p className="text-danger">{
                                                            signupError.lastname ? signupError.lastname : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="email" className="form-control form-control-lg" name="email" onChange={(e) => OnChangeHandler(e)}/>
                                                        <label className="form-label" htmlFor="email">Email</label>
                                                        <p className="text-danger">{
                                                            signupError.email ? signupError.email : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="phone" className="form-control form-control-lg" name="phone" onChange={(e) => OnChangeHandler(e)}/>
                                                        <label className="form-label" htmlFor="phone">Phone</label>
                                                        <p className="text-danger">{
                                                            signupError.phone ? signupError.phone : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="mobile" className="form-control form-control-lg" name="mobile" onChange={(e) => OnChangeHandler(e)}/>
                                                        <label className="form-label" htmlFor="mobile">Mobile</label>
                                                        <p className="text-danger">{
                                                           signupError.mobile ? signupError.mobile : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example8" className="form-control form-control-lg" name="address" onChange={(e) => OnChangeHandler(e)}/>
                                                <label className="form-label" htmlFor="form3Example8">Address</label>
                                                <p className="text-danger">{
                                                    signupError.address ? signupError.address : ``
                                                        }</p>
                                            </div>

                                            <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">

                                                <h6 className="mb-0 me-4">Gender: </h6>

                                                <div className="form-check form-check-inline mb-0 me-4">
                                                    <input className="form-check-input" type="radio" name="gender" id="femaleGender"
                                                        onClick={(e) => OnChangeHandler()} value='female'/>
                                                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                </div>

                                                <div className="form-check form-check-inline mb-0 me-4">
                                                    <input className="form-check-input" type="radio" name="gender" id="maleGender"
                                                        onClick={(e) => OnChangeHandler(e)} value='male'/>
                                                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                </div>

                                                <div className="form-check form-check-inline mb-0">
                                                    <input className="form-check-input" type="radio" name="gender" id="otherGender"
                                                        onClick={(e) => OnChangeHandler(e)} value='other'/>
                                                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                </div>
                                            </div>
                                            <p className="text-danger">{
                                                signupError.gender ? signupError.gender : ``
                                                        }</p>
                                            <div className="form-outline mb-4">
                                                <input type="date" id="birthday" className="form-control form-control-lg" name="birthday" onChange={(e) => OnChangeHandler(e)}/>
                                                <label className="form-label" htmlFor="birthday">Birthday</label>
                                                <p className="text-danger">{
                                                            signupError.birthday ? signupError.birthday : ``
                                                        }</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="password" id="password" className="form-control form-control-lg" name="pass" onChange={(e) => onChangePassword(e)}/>
                                                        <label className="form-label" htmlFor="password">Password</label>
                                                        <p className="text-danger">{
                                                           passError.pass ? passError.pass : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="password" id="confirm_password" className="form-control form-control-lg" name="confirmpass" onChange={(e) => onChangePassword(e)}/>
                                                        <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                                                        <p className="text-danger">{
                                                            passError.confirmpass ? passError.confirmpass : ``
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="submit" className="btn btn-warning btn-lg ms-2">Submit form</button>
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
export default SignUp