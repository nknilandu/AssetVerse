import React from 'react';

const LoadingPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-5">
            <span className="loading loading-ring text-primary w-10"></span>
            <h1 className="text-[20px] leading-tight text-primary bg-clip-text">Loading...</h1>

        </div>
    );
};

export default LoadingPage;