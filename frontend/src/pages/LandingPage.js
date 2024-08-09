import React from 'react';

const LandingPage = ({ setBoolean }) => {
    return (
        <div className='bg-slate-400 h-[100vh] flex justify-center items-center'>
            <button className='bg-fuchsia-500' onClick={() => { setBoolean(false) }}>get started</button>
        </div>
    );
};

export default LandingPage;