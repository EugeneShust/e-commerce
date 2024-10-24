import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components';
import { Home, Cart } from './pages';

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
