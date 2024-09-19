import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../att-logo.png';

function FinalPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Navigate to /Landing after the timeout
        }, 5000); // Adjust the timeout duration (5000 ms = 5 seconds)

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigate]);

    return (
        <div className="FinalPage">
            <h1>THE AT&T PERCH LIVING MURAL</h1>
            <br />
            <br />
            <div className="FinalText">
                <h4> Connecting </h4>
                <h3> Changes</h3>
                <h4> Everything </h4>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <img src={logo} className="logo" alt="Logo" />
            <br />
            <br />
        </div>
    );
}

export default FinalPage;
