import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import useWebSockets from '../useWebSocket';

function Proceed() {
    const navigate = useNavigate();
    const { handleClickSendMessage } = useWebSockets('wss://lw-server-ce19694e9edf.herokuapp.com/'); 

    const handleInternationalClick = () => {
        // Send the predefined zipcode '00000' via WebSocket
        handleClickSendMessage('00000');
        
        // Navigate to the international map (you can adjust the route as necessary)
        navigate('/intlmap');
    };

    return (
        <div>
            <Header />
            <div className="Proceed">
                <br />
                <p>What is your zip code?</p>
                <br />
                <Link to='/zipcode'>
                    <button>Atlanta Visitor</button>
                </Link> 
                <br />
                <br />
                <Link to='/zipcode'>
                    <button>US Visitor</button>
                </Link>
                <br />
                <br />
                <button onClick={handleInternationalClick}>
                    International Visitor
                </button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <Footer />
        </div>
    );
}

export default Proceed;
