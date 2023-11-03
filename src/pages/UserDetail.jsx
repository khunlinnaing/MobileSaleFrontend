import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Content from '../components/context';
import MyComponent from "./auth/get";
function UserInfo(){
    const { id } = useParams()
    const {page} = useContext(Content);
    const navigate = useNavigate();
    var values = MyComponent(id, 'http://localhost:5000/api/user/info/');
    function BackToUserLists(){
        navigate('/list')
    }
    return(
        <div>
            {
                values.status ===1 ? <div className="container my-4">
                    <div className="text-center">
                        <h3>{values.info.firstName}  {values.info.lastName} Profile</h3>
                        <img src={values.info.profile} width={25+"%"} />
                    </div>
                    <table className="table mx-5 px-5">
                        <tbody>
                            <tr>
                                <td><strong>Full Name</strong></td>
                                <td>{values.info.firstName} {values.info.lastName}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{values.info.email} </td>
                            </tr>
                            <tr>
                                <td><strong>Phone Number</strong></td>
                                <td>{values.info.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Mobile Number</strong></td>
                                <td>{values.info.mobile}</td>
                            </tr>
                            <tr>
                                <td><strong>Date of Birth</strong></td>
                                <td>{values.info.birthday}</td>
                            </tr>
                            <tr>
                                <td><strong>Gender</strong></td>
                                <td>{values.info.gender}</td>
                            </tr>
                            <tr>
                                <td><strong>Address</strong></td>
                                <td>{values.info.address}</td>
                            </tr>
                            <tr>
                                <td><strong>Role</strong></td>
                                <td>{values.info.role === 1 ? `user`: `admin` }</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn bg-warning" onClick={() => BackToUserLists()}>Back List</button>
                    
                </div> : 'the is no data'
            }
            
        </div>
    )
}
export default UserInfo;