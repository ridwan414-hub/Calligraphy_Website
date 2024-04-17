import React from 'react';
import './Features.css'; // Import your CSS file

function Features() {
    return (
        <section id="feature" className="section-p1">
            <div className="fe-box">
                <img src="../../Images/Febox/COD-01.jpg" alt="Cash On Delivery" />
                <h6>Cash On Delivery</h6>
            </div>
            <div className="fe-box">
                <img src="../../Images/Febox/standard-quality-control-collage.jpg" alt="Best Quality" />
                <h6>Best Quality</h6>
            </div>

            <div className="fe-box">
                <img src="../../Images/Febox/hand.jpg" alt="Made With Love" />
                <h6>Made With Love</h6>
            </div>
            <div className="fe-box">
                <img src="../../Images/Febox/save.jpg" alt="Save Money" />
                <h6>Save Money</h6>
            </div>
            <div className="fe-box">
                <img src="../../Images/Febox/customer.jpg" alt="5-Star Customer Satisfaction" />
                <h6>5★ Satisfaction</h6>
            </div>
        </section>
    );
}

export default Features;
