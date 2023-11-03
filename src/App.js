import { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Product from './pages/Products';
import Error from './pages/Error';
import SignUp from './pages/auth/signup';
import Login from './pages/auth/login';
import './App.css';
import { useState } from 'react';
import Context from './components/context';
import Setting from './pages/auth/setting';
import Footer from './pages/footer'
import CrateCategory from './pages/CreateCategory'
import UpdateCategory from './pages/UpdateCategory'
import CreateProduct from './pages/CreateProduct'
import UpdateProduct from './pages/UpdateProduct'
import ProductCategory from './pages/ProductByCategory'
import UserLists from './pages/UserList';
import UserInfo from './pages/UserDetail';

function App() {
  useEffect(() => {
    const clearLocalStorageAfterOneMinute = () => {
      localStorage.clear();
      window.location.reload();
    };
    const oneMinute = 86400000 // for one day milliseconds
    setTimeout(clearLocalStorageAfterOneMinute, oneMinute);
  }, []);
  const [page, setPage] = useState(1)
  const [total, setTotal]= useState(0)
  const displayPages = [];
  const [success, setSuccess] = useState(null)
  return (
    <BrowserRouter>
     <Context.Provider value={{ page, setPage, total, setTotal, displayPages, success, setSuccess}}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='category'  >
          <Route index element={!localStorage.getItem('token') ? <Login /> : <Category />} />
          <Route path='create' element={!localStorage.getItem('token') ? <Login /> : <CrateCategory />} />
          <Route path='update/:id' element={!localStorage.getItem('token') ? <Login /> : <UpdateCategory />} />
          <Route path='products/:id' element={!localStorage.getItem('token') ? <Login /> :<ProductCategory />} />
        </Route>
        <Route path='products' >
          <Route index element={!localStorage.getItem('token') ? <Login /> :<Product />}  />
          <Route path='create' element={!localStorage.getItem('token') ? <Login /> :<CreateProduct />} />
          <Route path='update/:id' element={!localStorage.getItem('token') ? <Login /> :<UpdateProduct />} />
        </Route>
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='setting' element={ !localStorage.getItem('email') ? <Login /> : <Setting />} />
        <Route path='list' >
          <Route index element={ !localStorage.getItem('token') ? <Login /> : <UserLists />} />
          <Route path='info/:id' element={!localStorage.getItem('token') ? <Login /> : <UserInfo />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
      </Context.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;