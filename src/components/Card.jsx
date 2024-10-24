import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export const Card = ({ data, filterHandler }) => {
    const { cart, addToCart, removeFromCart } = useOutletContext();

    const sum = cart
        .filter((x) => x.id === data.id)
        .reduce((count, x) => count + x.count, 0);
    return (
        <div id={data.id} className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={data.image} alt={data.title} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.description}</p>
                <a
                    onClick={() => filterHandler(data.category)}
                    className="link link-primary"
                >
                    {data.category}
                </a>
                <p>{data.price}€</p>
                {sum === 0 ? (
                    <div className="card-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(data.id)}
                        >
                            Buy Now
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col content-around justify-around lg:flex-row lg:gap-4 border-r-2">
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
                    </div>
                )}
            </div>
        </div>
    );
};
