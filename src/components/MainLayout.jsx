import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header, Footer } from './index';
import { fetchProducts } from '../modules';

export const MainLayout = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);

                const result = await fetchProducts();

                console.log('fetchProducts', result);

                setProducts(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            console.log('Cleanup function ran');
        };
    }, []);

    function addToCart(id) {
        const newCart = [...cart];

        const item = newCart.find((p) => p.id === id);
        if (item) ++item.count;
        else newCart.push({ id, count: 1 });

        setCart(newCart);
    }

    function removeFromCart(id) {
        let newCart = [...cart];

        const item = newCart.find((p) => p.id === id);
        if (!item) throw new Error('RemoveFromCart');

        --item.count;

        if (item.count === 0) newCart = newCart.filter((x) => x.id !== id);

        setCart(newCart);
    }

    return (
        <>
            <Header count={cart.reduce((count, x) => count + x.count, 0)} />
            <main className="container mx-auto">
                <Outlet
                    context={{
                        cart,
                        setCart,
                        products,
                        addToCart,
                        removeFromCart,
                    }}
                />
            </main>
            <Footer />
        </>
    );
};
