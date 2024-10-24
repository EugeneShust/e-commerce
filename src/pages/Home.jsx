import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Card } from '../components';
import { fetchCategories, fetchProducts } from '../modules';

export const Home = () => {
    const { products } = useOutletContext();

    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function addOrRemoveFilter(category) {
        let productFilters = [...filters];
        console.log('productFilters', productFilters);

        if (productFilters.includes(category))
            productFilters = productFilters.filter((x) => x !== category);
        else productFilters.push(category);

        setFilters(productFilters);
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);

                const result = await fetchCategories();

                console.log('fetchCategories', result);

                setCategories(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCategories();

        return () => {
            console.log('Cleanup function ran');
        };
    }, []);

    const filteredProducts =
        filters.length === 0
            ? products
            : products.filter((product) => filters.includes(product.category));

    if (loading)
        return (
            <div
                id="category-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                Loading...
            </div>
        );
    if (error)
        return (
            <div
                id="category-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                Error: {error}
            </div>
        );

    return (
        <>
            <div
                id="category-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`btn ${!filters.includes(category) ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => addOrRemoveFilter(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div
                id="product-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                {filteredProducts.map((product) => (
                    <Card
                        key={product.id}
                        data={product}
                        filterHandler={addOrRemoveFilter}
                    />
                ))}
            </div>
        </>
    );
};
