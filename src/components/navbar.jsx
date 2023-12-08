import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Context from './context';
import { useContext } from 'react';
import { ShoppingCart } from 'phosphor-react'
function NavBar() {
    const user = localStorage.getItem('userid')
    const email = localStorage.getItem('email')
    const {noti} = useContext(Context)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => (isActive ? "active nav-link" : " nav-link")}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/products" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/category" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Category</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Contact</NavLink>
                        </li>
                        {
                            email ? <li className='nav-item'>
                                <NavLink to="/setting" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Setting</NavLink>
                            </li>:``
                        }
                        
                        {
                            user ? 
                                <li className="nav-item">
                                    <NavLink to="/logout" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Logout</NavLink>
                                </li> :
                                <li className="nav-item">
                                    <NavLink to="/login" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Login</NavLink>
                                </li>

                        }
                        {
                           user ? 
                           `` :
                           <li className="nav-item">
                               <NavLink to="/signup" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>Register</NavLink>
                           </li> 
                        }
                        {
                            localStorage.getItem('role') !=1 ?
                            <li className='nav-item'>
                                <NavLink to="/list" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}>User List</NavLink>
                            </li> : ``
                        }
                        <li className="nav-item">
                            <NavLink to="/buy_product" className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}><ShoppingCart size={32}/> 
                            {
                                noti ? <sup className='bg-danger text-white'>{noti}</sup> : ``
                            }
                            </NavLink>
                        </li>                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;