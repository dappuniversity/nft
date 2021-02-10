
import React from 'react';
import Web3 from 'web3';

import Color from '../built-contracts/Color.json';
import './App.css';

const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  } catch (error) {
    console.log('[loadWeb3] error.message => ', error.message);
  }
};

const App = () => {
  const [account, setAccount] = React.useState('');
  const [contract, setContract] = React.useState(null);
  const [totalSupply, setTotalSupply] = React.useState(0);
  const [colors, setColors] = React.useState([]);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    (async () => {
      await loadWeb3();
      await handleLoadBlockchainData();
    })();
  }, []);

  const handleLoadBlockchainData = async () => {
    try {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = Color.networks[networkId];
      if(networkData) {
        const abi = Color.abi;
        const address = networkData.address;
        const theContract = new web3.eth.Contract(abi, address);
        setContract(theContract);
        const theTotalSupply = await theContract.methods.totalSupply().call();
        setTotalSupply(theTotalSupply);
        // Load Colors
        for (let index = 0; index < theTotalSupply; index++) {
          const color = await theContract.methods.colors(index).call();
          setColors(prevColors => ([
            ...prevColors,
            color
          ]));
        }
      } else {
        window.alert('Smart contract not deployed to detected network.');
      }
    } catch (error) {
      console.log('[handleLoadBlockchainData] error.message => ', error.message);
    }
  };

  const mint = async color => {
    try {
      await contract.methods.mint(color).send({ from: account });
      setColors(prevColors => ([
        ...prevColors,
        color
      ]));
    } catch (error) {
      console.log('[mint] error.message => ', error.message)
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const color = inputRef.current.value;
    mint(color);
  };

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer">
          Color Tokens
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">
              <span id="account">
                {account}
              </span>
            </small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <form
                onSubmit={handleSubmit}>
                <input
                  type='text'
                  className='form-control mb-1'
                  placeholder='e.g. #FFFFFF'
                  ref={inputRef} />
                <input
                  type='submit'
                  className='btn btn-block btn-primary'
                  value='MINT' />
              </form>
            </div>
          </main>
        </div>
        <hr/>
        <div className="row text-center">
          {colors.map(color => (
            <div
              key={color}
              className="col-md-3 mb-3">
              <div
                className="token"
                style={{ backgroundColor: color }}>
              </div>
              <div>{color}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
