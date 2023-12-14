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
import { EditOrder } from './pages/EditOrder';
import { CreateOrder } from './pages/CreateOrder';
import NotFound from './pages/NotFound';

export const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path='customers'>
            <Route index element={<Customers />} />
            <Route path='new' element={<CreateCustomer />} />
            <Route path='edit/:id' element={<EditCustomer />} />
          </Route>

          <Route path='products'>
            <Route index element={<Products />} />
            <Route path='new' element={<CreateProduct />} />
            <Route path='edit/:id' element={<EditProduct />} />
          </Route>

          <Route path='orders'>
            <Route index element={<Orders />} />
            <Route path='new' element={<CreateOrder />} />
            <Route path='edit/:id' element={<EditOrder />} />
          </Route>
          
          <Route path='/calendar' element={<CalendarPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
    </Routes>
  );
};
