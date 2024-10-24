import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export const CartCard = ({ data }) => {
    const { cart, addToCart, removeFromCart } = useOutletContext();

    const sum = cart
        .filter((x) => x.id === data.id)
        .reduce((count, x) => count + x.count, 0);
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={data.image}
                    alt={data.title}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">{data.title}</h1>
                    <p className="py-6">{data.description}</p>

                    <div className="flex flex-col content-around justify-end lg:flex-row lg:gap-4 border-r-2">
                        <div className="card-actions">
                            <button
                                className="btn btn-info"
                                onClick={() => removeFromCart(data.id)}
                            >
                                -
                            </button>
                        </div>
                        <p>{sum}</p>
                        <div className="card-actions">
                            <button
                                className="btn btn-info"
                                onClick={() => addToCart(data.id)}
                            >
                                +
                            </button>
                        </div>
                        <div>
                            <label for="price">Price</label>
                            <p id="price">{data.price}€</p>
                        </div>
                        <div>
                            {' '}
                            <label for="sum">Summe</label>
                            <p id="sum">{data.price * sum}€</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
