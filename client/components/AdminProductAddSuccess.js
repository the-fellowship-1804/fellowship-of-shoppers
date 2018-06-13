import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <div className="mainlanding">
        <h1 className="header1">Product successfully added to inventory!</h1>
      </div>
      <div className="centercontainer">
        <img id="landingimage" src="https://i.gifer.com/7U5F.gif" />
      </div>
      <Link to="/editproducts">
        <button type="button">Back to Admin Products Page</button>
      </Link>
    </div>
  );
};

export default Success;
