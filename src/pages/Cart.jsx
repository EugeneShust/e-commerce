import { useOutletContext } from 'react-router-dom';
import { CartCard, Alert } from '../components';
import { useState } from 'react';

export const Cart = () => {
    const { cart, products } = useOutletContext();

    const [showAlert, setShowAlert] = useState(false);

    const handleCheckout = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const cartWithProductDetails = cart.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return { ...product, count: item.count };
    });
    if (cartWithProductDetails.length === 0)
        return (
            <div className="flex gap-4 mt-2 flex-wrap justify-center">
                Da ist nichts.
            </div>
        );
    return (
        <>
            <div
                id="journal-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                {cartWithProductDetails.map((item) => (
                    <CartCard key={item.id} data={item} />
                ))}
                <button
                    className="btn btn-info"
                    onClick={() => handleCheckout()}
                >
                    {cartWithProductDetails.reduce(
                        (acc, x) => acc + x.price * x.count,
                        0,
                    )}
                    <span>€</span>
                </button>
            </div>

            <Alert showAlert={showAlert} />
        </>
    );
};
