import { useContext, useEffect, useState } from "react";
import Content from '../components/context';
function BuyProducts() {
    const [all, setAll] = useState([])
    const { buy, setBuy,setnoti } = useContext(Content)
    async function getProductDatas() {
        const response = await fetch('http://localhost:5000/api/products/home');
        const values = await response.json();
        if (values.status === 1) {
            setAll(values.data)
        }
    }
    useEffect(() => {
        getProductDatas()
        setnoti(0)
    }, [])
    return (
        <div className="container my-4">
            <h1 className="text-center">Buying Products </h1>
            <table className="table">
                <thead>
                    <th>No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Buy Amount</th>
                    <th>Price</th>
                </thead>
                {
                    all.map((product, index) => {
                        if (buy[product._id] !== 0) {
                            return (
                                <tr className="cart" key={product._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={product.Photo} width={100}/></td>
                                    <td>{product.Name}</td>
                                    <td><button className="btn" onClick={() => setBuy({ ...buy, [product._id]: buy[product._id] + 1 })}>+</button>
                                        {buy[product._id]}
                                        <button className="btn" onClick={() => setBuy({ ...buy, [product._id]: buy[product._id] - 1 })}>-</button></td>
                                    <td>{product.Price * buy[product._id]}</td>
                                </tr>
                            )
                        }
                    })
                }
            </table>
        </div>
    )
}
export default BuyProducts