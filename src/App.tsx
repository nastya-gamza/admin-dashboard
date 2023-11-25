import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Customers } from './pages/Customers';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Login } from './pages/Login';
import { CreateCustomer } from './pages/CreateCustomer';
import { EditCustomer } from './pages/EditCustomer';
import { SignUp } from './pages/SignUp';
import { PrivateRoute } from './pages/Private';
import { CalendarPage } from './pages/CalendarPage';
import { CreateProduct } from './pages/CreateProduct';
import { EditProduct } from './pages/EditProduct';

export const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='customers' element={<Customers />} />
          <Route path='customers/new' element={<CreateCustomer />} />
          <Route path='customers/edit/:id' element={<EditCustomer />} />
          <Route path='products' element={<Products />} />
          <Route path='products/new' element={<CreateProduct />} />
          <Route path='products/edit/:id' element={<EditProduct />} />
          <Route path='orders' element={<Orders />} />
          <Route path='/calendar' element={<CalendarPage />} />
        </Route>
      </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
    </Routes>
  );
};
