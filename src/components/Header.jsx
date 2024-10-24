import { Navbar } from './';
import { useLocation, useOutletContext } from 'react-router-dom';

export const Header = ({ count }) => {
    return (
        <header className="flex flex-row align-center justify-between m-4 p-2 bg-gray-400">
            <img
                className="h-10 w-20"
                src="https://svgsilh.com/svg_v2/402758.svg"
            />
            <div
                id="search"
                className="flex flex-row flex-nowrap gap-4 items-center border-3 rounded-md"
            >
                <Navbar count={count} />
            </div>
        </header>
    );
};
