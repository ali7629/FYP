import React, { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import walletContext from '../Context/walletContext';
const Navbar = () => {
    const location = useLocation();

    const context = useContext(walletContext);
    const { isWalletConnected, connectWallet, user } = context;
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">De Trust</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/myNFT">My NFT's</Link>

                        </li>
                    </ul>
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 py-2 text-lg ${location.pathname === "/" ? "active text-decoration-underline" : "text-white"
                                    }`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 py-2 text-lg ${location.pathname === "/myNFT" ? "active text-decoration-underline" : "text-white"
                                    }`}
                                to="/myNFT"
                            >
                                My NFT's
                            </Link>
                        </li>
                    </ul> */}



                    {!isWalletConnected && (<button className=" btn-gradient mx-2" aria-current="page" href="#" onClick={connectWallet}>Connect Wallet</button>)}
                    {(isWalletConnected && !user) &&
                        (<div className='d-flex'>
                            <Link className="btn-gradient mx-2 text-decoration-none" to="/userLogin">Register as User</Link>
                            <Link className=" btn-gradient mx-2 text-decoration-none" to="bussinessLogin">Register as Bussiness</Link>
                        </div>)
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar