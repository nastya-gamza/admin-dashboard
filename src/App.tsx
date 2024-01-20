import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { PrivateRoute } from '@/pages/Private';
import { Login } from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
const Home = lazy(() => import('@/pages/Home'));
const Customers = lazy(() => import('@/pages/Customers'));
const Products = lazy(() => import('@/pages/Products'));
const Orders = lazy(() => import('@/pages/Orders'));
const CreateCustomer = lazy(() => import('@/pages/CreateCustomer'));
const EditCustomer = lazy(() => import('@/pages/EditCustomer'));
const CalendarPage = lazy(() => import('@/pages/CalendarPage'));
const CreateProduct = lazy(() => import('@/pages/CreateProduct'));
const EditProduct = lazy(() => import('@/pages/EditProduct'));
const EditOrder = lazy(() => import('@/pages/EditOrder'));
const CreateOrder = lazy(() => import('@/pages/CreateOrder'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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
