import React from 'react';

const AppNotFound = () => {
    return (
         <div className="w-screen h-screen flex flex-col justify-center items-center px-10 gap-2">
            <title>Error | AssetVerse</title>
            <h1 className="text-6xl font-black text-base-content/70">Oops!</h1>
            <p className="text-xl"> App not found!</p>
            <div className="text-center text-xs">
                <p className="text-base-content/70">The App you are requesting is not found on our system. 
                </p>
            <p className="text-base-content/70">please try another apps</p>
            </div>

        </div>
    );
};

export default AppNotFound;