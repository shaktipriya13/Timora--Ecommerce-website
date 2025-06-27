// import React from 'react';

// const Footer = () => {
//     return (
//         <div>
//             Footer
//         </div>
//     );
// }

// export default Footer;
// Footer

import React from "react";
// import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <h1>© {new Date().getFullYear()} Shakti Priya. All Rights Reserved.</h1>
            {/* <p>
                <Link to="/about">About</Link> |
                <Link to="/contact">Contact</Link> |
                <Link to="/policy">Privacy Policy</Link>
            </p> */}
        </div>

    );
};

export default Footer;
