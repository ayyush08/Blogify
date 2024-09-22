// Tooltip.jsx
import React from 'react';

// Tooltip Component
const Tooltip = ({ children, text }) => {
    return (
        <div className="relative group ">
            {/* Element to hover over */}
            {children}
            {/* Tooltip text */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white py-1 px-2 rounded shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-[9px]">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
