import React from "react";

const BlendMovingBackground: React.FC = () => {
    return <>
        <div className="bg-purple-300 w-72 h-72 rounded-full absolute top-0 -left-4 mix-blend-multiply  filter blur-xl opacity-70 animate-blob" />
        <div className="bg-yellow-500 w-72 h-72 rounded-full absolute -top-12 -right-4 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="bg-pink-300 w-72 h-72 rounded-full absolute top-12 right-24 mix-blend-multiply filter blur-xl opacity-70 animate-blob animatation-delay-4000" />
    </>
}

export default BlendMovingBackground;
