import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PaginationExample from './Paggination'
import Content from '../components/context';
function UserLists() {
    const [datas, setDatas] = useState([])
    const {page, setPage, total, setTotal} = useContext(Content);
    const navigate = useNavigate();
    async function getDatas() {
        const response = await fetch('http://localhost:5000/api/user?page='+page);
        const values = await response.json();
        if (values.status === 1) {
            console.log(values.data)
            setDatas(values.data)
            setTotal(values.total)
        }
    }
    
    function Detail(id){
        navigate('/list/info/'+id)
    }
    function DeleteUser(id){
        console.log(id)
        fetch('http://localhost:5000/api/user/'+id, {
                method: 'DELETE'
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
    }
    useEffect(() => {
        getDatas();
    }, [page]);
    return (
        <div className="container-fluid">
            <div className="container">
                <h3 className="text-center my-4">User Lists</h3>
            </div>
            <div className="container">
                <table className="table table-striped table-hover mt-4">
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Profile</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>Mobile Number</td>
                            <td>Gender</td>
                            <td>Address</td>
                            <th>Birthday</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            datas.map((data, index) => {
                                return (
                                    <tr key={data._id}>
                                        <td>{
                                            page < 2 ? page + index: ((page-1)* 10)+(index+1)
                                            }</td>
                                        <td><img src={data.profile} width={50} height={50} /></td>
                                        <td>{data.firstName} {data.lastName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.mobile}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.address}</td>
                                        <td>{data.birthday} ({calculateAge(data.birthday)} Year)</td>
                                        <td>{data.role ===2 ? `admin` : 'user'}</td>
                                        <td>
                                            <button className='btn btn-primary text-white' onClick={() =>Detail(data._id)}>Detail</button>
                                            <button className='btn btn-danger text-white mx-2' onClick={() => DeleteUser(data._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <PaginationExample/>
            </div>
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
export default UserLists;