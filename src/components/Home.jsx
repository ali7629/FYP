import React, { useState, useEffect, useContext } from 'react';
import walletContext from '../Context/walletContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BlockchainBackground from './background';

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const context = useContext(walletContext);
  const { currentAccount, myContarct, user, isUserRegistered } = context;



  const getAllDomains = async () => {
    const DomainsData = await myContarct.methods.getRegisteredDomains().call();
    const BussinesDetailsPromises = DomainsData.map(async (domain) => {
      return myContarct.methods.getBusinessDetailsByDomain(domain).call();
    });

    const BussinessDetails = await Promise.all(BussinesDetailsPromises);
    setData(BussinessDetails);
    // console.log(data, DomainsData);
    // console.log(typeof (DomainsData));
  }
  useEffect(() => {
    getAllDomains();

  }, []);

  useEffect(() => {
    isUserRegistered();
  }, [])


  return (


    <div className=' text-center '>
      {currentAccount ? (
        user ? (
          // your existing content
          <div className='overflow-x-hidden'>
            <div className='wallet-bg shadow px-3 py-5 mt-5 bg-body-tertiary rounded bg-gardient'>
              <h1 className="mt-4 ms-5">Read Reviews, Write Reviews, Find Companies You can Trust</h1>
            </div>
            <h1 className="my-5">List of All registered Businesses</h1>
            <div className="row">
              {data.map((Bussiness, index) => (
                <div className="col-md-4 col-sm-6 col-12" key={index}>
                  <div className='shadow bg-form rounded m-2 p-3'>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-dark text-white border-bottom-none">{Bussiness.username}</li>
                      <Link className="btn-gradient mt-3 text-decoration-none" to={`createReview/${Bussiness.userBusinessDomain}`}>Details</Link>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className=" mx-5 py-5 rounded wallet-bg  mt-5" role="alert">
            <h3>Please register Yourself</h3>
          </div>
        )
      ) : (
        // <div className="wallet-bg d-flex align-items-center justify-content-center vh-100">
        //   <div className="alert alert-primary" role="alert">
        //     <strong>Please Connect Your Wallet</strong>
        //   </div>
        // </div>
        <main className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
          <BlockchainBackground />
        </main>
      )}
    </div>

  )
}

export default Home