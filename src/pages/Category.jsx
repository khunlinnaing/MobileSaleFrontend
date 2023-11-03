import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PaginationExample from './Paggination'
import Content from '../components/context';
function Category() {
    const [datas, setDatas] = useState([])
    const {page, setPage, total, setTotal} = useContext(Content);
    const navigate = useNavigate();
    async function getDatas() {
        const response = await fetch('http://localhost:5000/api/category?page='+page,
        {
            headers: {
                'token': 'token '+localStorage.getItem('token'),
            }
        }
        );
        const values = await response.json();
        console.log(values)
        if (values.status === 1) {
            setDatas(values.data)
            setTotal(values.total)
        }
    }
    function createCategory(){
        navigate('/category/create')
    }
    function UpdateCategory(id){
        navigate('/category/update/'+id)
    }

    function Detail(id){
        navigate('/category/products/'+id)
    }
    function DeleteCategory(id){

        fetch('http://localhost:5000/api/category/'+id, {
                method: 'Delete',
                headers: {
                    'token': 'token '+localStorage.getItem('token'),
                }
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
                <h3 className="text-center my-4">Categories Lists</h3>
                {
                    localStorage.getItem('role') != 1 ?
                    <div className="row ml-4">
                    <button className="btn btn-success w-25" onClick={createCategory}>+Add new categories</button>
                </div> : ``}
            </div>
            <div className="container">
                <table className="table table-striped table-hover mt-4">
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Type</td>
                            <td>Amout of Products</td>
                            <td>Description</td>
                            <td>Action</td>
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
                                        <td><img src={data.Photo} width={50} height={50} /></td>
                                        <td>{data.Name}</td>
                                        <td>{data.Type}</td>
                                        <td>{data.Amout}</td>
                                        <td>{data.Description}</td>
                                        <td>
                                            <button className='btn btn-primary text-white' onClick={() =>Detail(data._id)}>Detail</button>
                                            {
                                                localStorage.getItem('role') != 1 ?
                                                <span><button className='btn btn-success text-white mx-4' onClick={() =>UpdateCategory(data._id)}>Update</button>
                                                <button className='btn btn-danger text-white' onClick={() => DeleteCategory(data._id)}>Delete</button>
                                                </span>: ``
                                            }
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
export default Category;