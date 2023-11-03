import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginValidation from './LoginValidate'
function Login() {
    const [values, setValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({})
    const [resperror, setRespError] = useState('')
    function HandlerChange(e){
        setValue({...values, [e.target.name]: [e.target.value]})
    }
    const navigate = useNavigate()
    function SubmitHandler(e) {
        e.preventDefault()
        setError(loginValidation(values))
        
    }
    useEffect(() =>{
        if(Object.keys(error).length === 0 && (values.email !=="" && values.password !=="")){
            fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "password":values.password[0],
                    "email":values.email[0]
                }),
            })
            .then(response => response.json())
            .then(result => {
                if(result.status === 1){
                    localStorage.setItem('userid', result.id)
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('role', result.role)
                    localStorage.setItem('email', result.email)
                    window.location.reload();
                    navigate('/')
                }else{
                    console.log(result)
                    setRespError(result.message)
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    },[error])
    return (
        <section className="gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">

                                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={SubmitHandler}>

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    { resperror ? <div className="alert alert-danger text-danger">{resperror}</div>: ``}

                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        <input type="text" id="typeEmailX" className="form-control form-control-lg" name='email' onChange={(e) => HandlerChange(e)} />
                                        <p className='text-danger'>{
                                            error.email ? error.email : ``
                                        }
                                        </p>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        <input type="password" id="typePasswordX" className="form-control form-control-lg" name='password' onChange={(e) => HandlerChange(e)} />
                                        <p className='text-danger'>{
                                            error.password ? error.password : ``
                                        }
                                        </p>
                                    </div>

                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                                        <a href="#!" className="text-white"><FontAwesomeIcon icon={faTwitter} size="lg" className='px-2' /></a>
                                        <a href="#!" className="text-white"><FontAwesomeIcon icon={faGoogle} size="lg" /></a>
                                    </div>
                                </form>

                                <div>
                                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Login