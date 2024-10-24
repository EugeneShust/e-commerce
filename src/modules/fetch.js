async function fetchProducts(query) {
    const url = 'https://fakestoreapi.com/products';

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('fetchProducts request failed');

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function fetchCategories() {
    const url = 'https://fakestoreapi.com/products/categories';

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('fetchCategories request failed');

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export { fetchProducts, fetchCategories };
