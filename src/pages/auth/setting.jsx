import { useState, useEffect } from 'react'
import SignUpValidate from "./SignUpValidate";
import MyComponent from './get';
import convertImageToBase64 from './GenerateImage';
import { useNavigate } from 'react-router-dom';
function Setting() {
    const email = localStorage.getItem('email');
    const [base64Image, setBase64Image] = useState(null);
    const [update, setUpdate] = useState(true)
    const [settingError, setSettingError] = useState({})
    const [age, setAge] = useState(0)
    const navigate= useNavigate()
    const [setting, setSetting] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        mobile: '',
        address: '',
        gender: '',
        birthday: ''
    });
    var values = MyComponent(email,'http://localhost:5000/api/user/');
    function UpdateOnChangeHandler(e) {
        if (e.target.name === 'birthday') {
            setAge(calculateAge(e.target.value))
        }
        setSetting({ ...setting, [e.target.name]: e.target.value })
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            convertImageToBase64(file, (base64String) => {
                setBase64Image(base64String);
            });
        } else {
            setSetting({...setting,file: 'please enter png and jpeg or jpg only' })
        }
    };
    function UpdateHandler() {
        setSettingError(SignUpValidate(setting))
        if(Object.keys(settingError).length === 0  && (setting.firstname !=="" && setting.lastname !=="" && setting.email !==""&& setting.phone !=="" && setting.address !=="" && setting.gender !=="" && setting.birthday !=="")){
            fetch('http://localhost:5000/api/user/'+localStorage.getItem('userid'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "firstName": setting.firstname,
                        "lastName": setting.lastname,
                        "email": setting.email,
                        "phone": setting.phone, 
                        "mobile": setting.mobile, 
                        "address": setting.address, 
                        "birthday": setting.birthday, 
                        "profile": base64Image, 
                        "gender": setting.gender
                    }
                ),
            })
            .then(response => response.json())
            .then(result => {
                if(result.status === 1){
                    window.location.reload();
                }else{
                    console.log(result)
                }
                
            })
            .catch(error => {
                console.error(error);
            });
        }else{
            console.log("somethisng Error")
        }
    }

    useEffect(() => {
        if (values.status === 1) {
            setAge(calculateAge(values.info.birthday))
            localStorage.setItem('userid', values.info._id)
            localStorage.setItem('token', values.token)
            localStorage.setItem('role', values.info.role)
            setBase64Image(values.info.profile)
            console.log(values.info)
            setSetting({
                ...setting,
                firstname: values.info.firstName,
                lastname: values.info.lastName,
                email: values.info.email,
                phone: values.info.phone,
                mobile: values.info.mobile,
                address: values.info.address,
                gender: values.info.gender,
                birthday: values.info.birthday
            })
        }
        
    }, [values, settingError])

    return (
        <div className="container">
            <h3 className="text-center my-4">({setting.firstname} {setting.lastname}) Profile Page</h3>
            <div className='text-center mb-5 mt-2'>
                <img src={base64Image} className='profile' />
            </div>
            {update ?
                <div className='container'>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td><strong>Full Name</strong></td>
                                <td>{setting.firstname} {setting.lastname}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{setting.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone Number</strong></td>
                                <td>{setting.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Mobile Number</strong></td>
                                <td>{setting.mobile}</td>
                            </tr>
                            <tr>
                                <td><strong>Birthday</strong></td>
                                <td>{setting.birthday} ({age} Year)</td>
                            </tr>
                            <tr>
                                <td><strong>Gender</strong></td>
                                <td>{setting.gender}</td>
                            </tr>
                            <tr>
                                <td><strong>Address</strong></td>
                                <td>{setting.address}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-success' onClick={() => setUpdate(false)}>Update Profile</button>
                </div>
                : <div>
                    <div>
                        <input type="file" id="profile" className="form-control form-control-lg" onChange={handleImageChange} />
                        <p className='text-danger'>{settingError.file ? settingError.file : ``}</p>
                    </div>
                    <table className='table my-4'>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>
                                    <input type='text' className="form-control" value={setting.firstname} name="firstname" onChange={(e) => UpdateOnChangeHandler(e)} placeholder='Enter your First Name' />
                                    <p className='text-danger'>
                                        {
                                            settingError.firstname ? settingError.firstname : ``
                                        }
                                    </p>
                                </td>
                                <td>
                                    <input type='text' className="form-control" value={setting.lastname} name='lastname' onChange={(e) => UpdateOnChangeHandler(e)} placeholder='Enter your First Name' />
                                    <p className='text-danger'>
                                        {
                                            settingError.lastname ? settingError.lastname : ``
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>
                                    <input type='text' className='form-control' value={setting.email} name='email' onChange={(e) => UpdateOnChangeHandler(e)} placeholder='Enter Your Email Address' />
                                    <p className='text-danger'>
                                        {
                                            settingError.email ? settingError.email : ``
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Gender</strong></td>
                                <td><div className="d-md-flex justify-content-start align-items-center mb-4 py-2">

                                    <h6 className="mb-0 me-4">Gender: </h6>

                                    <div className="form-check form-check-inline mb-0 me-4">
                                        <input className="form-check-input" type="radio" name="gender" id="femaleGender"
                                            onClick={(e) => UpdateOnChangeHandler(e)} defaultChecked={setting.gender === 'female' ? true : ``} value="female" />
                                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                    </div>

                                    <div className="form-check form-check-inline mb-0 me-4">
                                        <input className="form-check-input" type="radio" name="gender" id="maleGender"
                                            onClick={(e) => UpdateOnChangeHandler(e)} defaultChecked={setting.gender === 'male' ? true : ``} value="male" />
                                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                                    </div>

                                    <div className="form-check form-check-inline mb-0">
                                        <input className="form-check-input" type="radio" name="gender" id="otherGender"
                                            onClick={(e) => UpdateOnChangeHandler(e)} defaultChecked={setting.gender === 'other' ? true : ``} value="other" />
                                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                                    </div>
                                </div>
                                    <p className='text-danger'>
                                        {
                                            settingError.gender ? settingError.gender : ``
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Phone Number</strong></td>
                                <td>
                                    <input type='text' className='form-control' value={setting.phone} name='phone' onChange={(e) => UpdateOnChangeHandler(e)} placeholder='Enter Your Phone' />
                                    <p className='text-danger'>
                                        {
                                            settingError.phone ? settingError.phone : ``
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Mobile Number</strong></td>
                                <td>
                                    {
                                        console.log(setting.mobile)
                                    }
                                    <input type='text' className='form-control' value={setting.mobile} name='mobile' onChange={(e) => UpdateOnChangeHandler(e)} placeholder='Enter Your Address' />
                                    <p className='text-danger'>
                                        {
                                            settingError.mobile ? settingError.mobile : ``
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Date Of Birth</strong></td>
                                <td>
                                    <input type='date' className='form-control' value={setting.birthday} name='birthday' onChange={(e) => {
                                        UpdateOnChangeHandler(e)
                                    }} placeholder='Enter Your Address' />
                                    <p className='text-danger'>
                                        {
                                            settingError.birthday ? settingError.birthday : ``
                                        }
                                    </p>
                                </td>
                                <td>({age} Year)</td>
                            </tr>
                            <tr>
                                <td><strong>Address</strong></td>
                                <td>
                                    <input type='text' className='form-control' value={setting.address} name='address' onChange={(e) => UpdateOnChangeHandler(e)} placeholder='Enter Your Address' />
                                    <p className='text-danger'>
                                        {
                                            settingError.address ? settingError.address : ``
                                        }
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td><button className='btn bg-primary text-white' onClick={() => setUpdate(true)}>Cancel</button></td>
                                <td><button className='btn bg-success text-white' onClick={() => UpdateHandler()}>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
function calculateAge(age) {
    const currentDate = new Date();
    const diffTime = currentDate - new Date(age);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const year = Math.floor(totalDays / 365.25)
    return year;
}
export default Setting;