import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


function RouterApp() {
    let navigate = useNavigate();

    const pageClick = ()=>{
        navigate("/page1");
    }
    return (
        <div>
            <button onClick={pageClick}>画面遷移</button>
        </div>
    );
}

export default RouterApp;