import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout} from "antd";
import SearchCollections from "components/SearchCollections";
import  SearchCollection from "components/SearchCollection";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import MediaQuery from 'react-responsive'
import { Navbar } from 'responsive-navbar-react'
import NFTMarketTransactions from "components/NFTMarketTransactions";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "40px",
    padding: "10px",
    marginLeft:"25px",
  },
  header: {
    position: "sticky",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
    position: "auto",
  },
  headerRight1: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    fontSize: "9.5px",
    fontWeight: "200",
    position: "relative",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

const handleMediaQueryChange = (matches) => {
        // matches will be true or false based on the value for the media query
      }

  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (

    <Layout style={{ height: "100vh", overflow: "auto", overflowX:"auto"}}>
      <Router>
  
        <Header style={styles.header}>
          <MediaQuery minWidth={1224} onChange={handleMediaQueryChange}><Logo/></MediaQuery>
          <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}> <Log/></MediaQuery>
          
           <MediaQuery minWidth={1224} onChange={handleMediaQueryChange}> <SearchCollections setInputValue={setInputValue} /></MediaQuery>
           <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}><SearchCollection setInputValue={setInputValue}/></MediaQuery>


          <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}><Menu
              theme="light"
              mode="horizontal"
              style={{
                display: "flex",
                fontSize: "9.5px",
                fontWeight: "400",
                marginLeft: "13px",
                width: "100%",
              }}
              defaultSelectedKeys={["nftMarket"]}
            >
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
            </Menu.Item>
            <Menu.Item key="transactions">
              <NavLink to="/Transactions">📑 Your Transactions</NavLink>
            </Menu.Item>
         
          <Menu.Item key="xhain">
            <Chains />
          </Menu.Item>
          <Menu.Item key="yative">
            <NativeBalance />
          </Menu.Item>
          <Menu.Item key="zccount">
            <Account />
          </Menu.Item>
         
            </Menu>
            </MediaQuery>


<MediaQuery minWidth={1224} onChange={handleMediaQueryChange}>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "0px",
              width: "100%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >

            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
            </Menu.Item>
            <Menu.Item key="transactions">
              <NavLink to="/Transactions">📑 Your Transactions</NavLink>
            </Menu.Item>
         
          <div style={styles.headerRight}>
           <Menu.Item key="chains">
            <Chains />
          </Menu.Item>
          <Menu.Item key="native">
            <NativeBalance />
          </Menu.Item>
          <Menu.Item key="account">
            <Account />
          </Menu.Item>
          </div>
         </Menu>
</MediaQuery>
        </Header>
     <div style={{ textAlign: "center", fontWeight: "Bold", marginTop: "35px", fontSize:"23px"}}>  <MediaQuery minWidth={1224} onChange={handleMediaQueryChange}> <Latest/></MediaQuery></div>
          <div style={{ marginLeft:"10px", textAlign: "center", fontWeight: "Bold", marginTop: "15px", fontSize:"9.5px"}}>  <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}> <Latest/></MediaQuery></div>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
<div>
<MediaQuery minWidth={1224} onChange={handleMediaQueryChange}>
      <Footer style={{ textAlign: "center" }}>
     <Text style={{ display: "block", fontSize:"10px" }}>
       Moralis enables you to simultaneously bid your favorite NFT collection <br/> on all marketplaces where your collection is hosted from one bid point <br/>⭐️ Use a web3 browser to view Market Items
       <a 
         target="_blank" 
         rel="noopener noreferrer"
         href="https://metamask.io/"
      > metamask.io 
      </a>
        
     </Text>
        <Text style={{ display: "block", fontSize:"10px" }}>
            Community-first NFT metaverse ⭐️ built for the community by
        </Text>

        <Text style={{ display: "block", fontSize:"10px" }}>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io/"
          >
           moralis.io
          </a>
          <Text> Decentralized NFT Market place</Text>
        </Text>
        <Text style={{ display: "block", fontSize:"10px" }}>Bids are submitted simultaneously on Opensea, Rarible, LooksRear. when you Bid on Moralis</Text>

    
      </Footer>
</MediaQuery>
<MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}>
      <Footer style={{ textAlign: "center" }}>
      <Text style={{ display: "block", fontSize:"9px" }}>
        Moralis enables you to simultaneously bid your favorite NFT collection <br/>
       on all marketplaces where your collection is hosted from one bid point
         <br/> ⭐️ Use a web3 browser to view Market Items
      </Text>
        <Text style={{ display: "block", fontSize:"9px" }}>
        Community-first NFT metaverse ⭐️ built for the community by
        </Text>
        <br/>

        <Text style={{ display: "block", fontSize:"9px", textAlign: "center"}}>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io/"
          > 
              moralis.io
      </a> 
           <Fotlogolook/>
              <Fotlogosea/>
              <Fotlogorari/>
             
<Text style={{ display: "block", fontSize:"9px",textAlign: "center"}}> Decentralized NFT Market place</Text>
        </Text>
        <Text style={{ display: "block", fontSize:"9px"}}> Bids are submitted simultaneously on Opensea, Rarible, LooksRear.<br/> when you Bid on Moralis</Text>
      </Footer>
  
  </MediaQuery>
</div>
    </Layout>

  );

};
export const Latest = () =>(
  <div>
  <Text style={{ display: "block", textAlign: "center", fontSize: "13px", }}>
    <Text> Top collections over </Text>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://opensea.io/"
    >
     &nbsp;last 24 hours
    </a>
  </Text>
  </div>
);
export const Logo = () => (
  <div style={{ display: "flex" }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="41" viewBox="0 0 170 41" fill="none"><path d="M48.6137 8.60315C46.3773 3.88399 41.8154 0.616738 36.6734 0.230609C34.154 -0.00351512 31.5542 0.4228 29.2828 1.56721C27.7575 2.32374 26.4 3.37381 25.259 4.6248C22.9056 1.95683 19.5807 0.209642 15.9919 0.0296815C8.44756 -0.424588 1.94451 4.46056 0.359807 12.0416C-0.602896 16.5826 0.447166 21.3245 2.53157 25.3185C4.61247 29.2585 7.64909 32.7616 11.5995 34.8198C14.3566 36.1616 16.9407 32.7581 14.9244 30.3784C14.2814 29.6586 13.6891 28.8933 13.1493 28.0756C12.6478 27.3173 12.197 26.5206 11.7882 25.7047C10.6525 23.3774 9.80513 20.7566 9.63739 18.176C9.53781 16.5354 9.75271 15.1219 10.4341 13.6945C11.0788 12.3631 12.1236 11.2187 13.4952 10.6806C15.6285 9.87161 17.8544 10.3067 19.4758 12.0539C20.5294 13.1389 21.0116 14.6572 21.5497 16.0584C21.5899 16.1598 21.6336 16.2576 21.679 16.3537C22.7501 19.6576 27.6597 19.7415 28.577 15.9833C28.6049 15.8557 28.6329 15.7265 28.6626 15.5954C28.6678 15.5744 28.673 15.5552 28.6783 15.5343C28.6835 15.5133 28.687 15.4923 28.6923 15.4696C28.7709 15.1342 28.8617 14.7987 28.9788 14.4859C29.344 13.4778 29.952 12.5046 30.6823 11.7621C31.7831 10.6421 33.186 9.96596 34.7218 10.1162C35.5814 10.1651 36.5511 10.3993 37.25 10.7784C41.1707 12.9047 40.7619 18.4923 39.0811 22.1736C37.9 24.7524 36.0095 26.9102 33.9129 28.7745C33.394 29.234 32.8017 29.7407 32.2653 30.1687C29.807 32.0784 29.178 35.6934 31.1209 38.2844C33.2053 41.1324 37.3566 41.2704 39.7415 38.737C40.2098 38.274 40.6623 37.7935 41.1078 37.3095C45.6068 32.2846 49.6953 24.8258 50.3312 17.9524C50.5933 14.7393 50.022 11.528 48.612 8.60315H48.6137Z" fill="url(#paint01212)"></path>
  <path d="M79.9514 12.3423C81.7964 12.3423 83.278 12.9311 84.3945 14.1087C85.511 15.2863 86.0683 16.8535 86.0683 18.8121V28.4077H81.2391V19.2192C81.2391 18.4278 81.0399 17.8023 80.6433 17.3445C80.2467 16.8867 79.6718 16.6561 78.9205 16.6561C78.1256 16.6561 77.5088 16.9164 77.0703 17.4371C76.63 17.9578 76.4098 18.6776 76.4098 19.5931V28.4077H71.5806V19.2192C71.5806 18.4278 71.3814 17.8023 70.9848 17.3445C70.5882 16.8867 70.0134 16.6561 69.2621 16.6561C68.4671 16.6561 67.8503 16.9164 67.4118 17.4371C66.9715 17.9578 66.7514 18.6776 66.7514 19.5931V28.4077H61.9221V12.7791H66.7514V14.217C67.6319 12.966 69.0699 12.3423 71.0652 12.3423C72.9329 12.3423 74.3377 13.0307 75.2829 14.4057C76.2701 13.0307 77.8268 12.3423 79.9514 12.3423Z" fill="#597196"></path><path d="M103.002 26.4541C101.349 28.0475 99.3314 28.846 96.9499 28.846C94.5685 28.846 92.5505 28.0493 90.8977 26.4541C89.2448 24.8606 88.4184 22.9073 88.4184 20.594C88.4184 18.2807 89.2448 16.3273 90.8977 14.7339C92.5505 13.1405 94.5685 12.3438 96.9499 12.3438C99.3314 12.3438 101.349 13.1405 103.002 14.7339C104.655 16.3273 105.481 18.2807 105.481 20.594C105.481 22.9073 104.655 24.8606 103.002 26.4541ZM94.3099 23.2497C95.0175 23.9381 95.8981 24.2806 96.9499 24.2806C98.0017 24.2806 98.8806 23.9364 99.5899 23.2497C100.298 22.5613 100.652 21.6772 100.652 20.5922C100.652 19.5072 100.298 18.6232 99.5899 17.9348C98.8823 17.2464 98.0017 16.9039 96.9499 16.9039C95.8981 16.9039 95.0175 17.2481 94.3099 17.9348C93.6023 18.6214 93.2476 19.509 93.2476 20.5922C93.2476 21.6755 93.6023 22.5613 94.3099 23.2497Z" fill="#597196"></path><path d="M112.76 28.4094H107.629V12.6952H112.503V16.4831C113.277 13.5845 115.311 12.3003 117.249 12.3003C117.893 12.3003 118.605 12.3335 119.476 12.7284L118.218 17.6694C117.153 17.2745 116.379 17.2745 115.895 17.2745C113.959 17.2745 112.764 18.3945 112.764 23.0053V28.4111L112.76 28.4094Z" fill="#597196"></path><path d="M132.273 12.7783H137.102V28.4069H132.273V26.5566C131.663 28.1291 129.537 28.8437 127.477 28.8437C125.417 28.8437 123.539 28.047 122.036 26.4518C120.533 24.8584 119.782 22.905 119.782 20.5917C119.782 18.2785 120.533 16.3251 122.036 14.7317C123.539 13.1382 125.352 12.3048 127.477 12.3415C131.139 12.4044 132.362 14.1516 132.273 15.0252V12.7783ZM125.674 23.3733C126.381 24.0617 127.304 24.4041 128.443 24.4041C129.582 24.4041 130.503 24.0599 131.212 23.3733C131.922 22.6866 132.275 21.7589 132.275 20.5917C132.275 19.4246 131.92 18.4969 131.212 17.8102C130.505 17.1236 129.58 16.7794 128.443 16.7794C127.306 16.7794 126.383 17.1236 125.674 17.8102C124.966 18.4986 124.611 19.4246 124.611 20.5917C124.611 21.7589 124.966 22.6866 125.674 23.3733Z" fill="#597196"></path><path d="M140.672 28.4074V5.59082H145.501V28.4074H140.672Z" fill="#597196"></path><path d="M153.59 10.5756C153.021 11.1277 152.339 11.4038 151.546 11.4038C150.753 11.4038 150.07 11.1277 149.502 10.5756C148.932 10.0235 148.649 9.36132 148.649 8.59081C148.649 7.8203 148.934 7.15811 149.502 6.606C150.07 6.05389 150.751 5.77783 151.546 5.77783C152.341 5.77783 153.021 6.05389 153.59 6.606C154.158 7.15811 154.443 7.8203 154.443 8.59081C154.443 9.36132 154.158 10.0235 153.59 10.5756ZM149.132 28.4075V12.7788H153.961V28.4075H149.132Z" fill="#597196"></path><path d="M162.08 17.3424C162.08 17.6552 162.354 17.9102 162.901 18.1077C163.448 18.3051 164.108 18.5043 164.881 18.7017C165.653 18.8992 166.425 19.1543 167.199 19.467C167.971 19.7797 168.632 20.2952 169.179 21.0133C169.726 21.7314 170 22.6329 170 23.7162C170 25.404 169.355 26.6812 168.068 27.5443C166.78 28.4091 165.192 28.8407 163.303 28.8407C159.912 28.8407 157.605 27.6019 156.382 25.1209L160.567 22.8076C160.997 24.0377 161.907 24.6509 163.303 24.6509C164.461 24.6509 165.041 24.3277 165.041 23.6812C165.041 23.3685 164.767 23.1081 164.22 22.9002C163.673 22.6923 163.013 22.4896 162.241 22.2905C161.468 22.093 160.696 21.8327 159.922 21.5095C159.15 21.1862 158.489 20.6813 157.943 19.9929C157.396 19.3045 157.121 18.4606 157.121 17.4612C157.121 15.8363 157.728 14.5749 158.94 13.6786C160.153 12.7822 161.65 12.335 163.431 12.335C164.762 12.335 165.974 12.6215 167.068 13.1946C168.162 13.7677 169.042 14.5958 169.708 15.6791L165.588 17.8351C165.073 16.9178 164.353 16.4601 163.431 16.4601C162.508 16.4601 162.078 16.7519 162.078 17.3354L162.08 17.3424Z" fill="#597196"></path><defs><radialGradient id="paint01212" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34.5075 37.7962) rotate(-125.286) scale(43.6181 66.287)"><stop offset="0.0001" stopColor="#09FFD0"></stop><stop offset="1" stopColor="#009EFF"></stop></radialGradient><clipPath id="clip0_2005_54716"><rect width="170" height="40.5348" fill="white"></rect></clipPath></defs></svg>


  </div>
);

export const Log=()=>(
  <div style={{ display: "flex" }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="41" viewBox="0 0 170 41" fill="none"><path d="M48.6137 8.60315C46.3773 3.88399 41.8154 0.616738 36.6734 0.230609C34.154 -0.00351512 31.5542 0.4228 29.2828 1.56721C27.7575 2.32374 26.4 3.37381 25.259 4.6248C22.9056 1.95683 19.5807 0.209642 15.9919 0.0296815C8.44756 -0.424588 1.94451 4.46056 0.359807 12.0416C-0.602896 16.5826 0.447166 21.3245 2.53157 25.3185C4.61247 29.2585 7.64909 32.7616 11.5995 34.8198C14.3566 36.1616 16.9407 32.7581 14.9244 30.3784C14.2814 29.6586 13.6891 28.8933 13.1493 28.0756C12.6478 27.3173 12.197 26.5206 11.7882 25.7047C10.6525 23.3774 9.80513 20.7566 9.63739 18.176C9.53781 16.5354 9.75271 15.1219 10.4341 13.6945C11.0788 12.3631 12.1236 11.2187 13.4952 10.6806C15.6285 9.87161 17.8544 10.3067 19.4758 12.0539C20.5294 13.1389 21.0116 14.6572 21.5497 16.0584C21.5899 16.1598 21.6336 16.2576 21.679 16.3537C22.7501 19.6576 27.6597 19.7415 28.577 15.9833C28.6049 15.8557 28.6329 15.7265 28.6626 15.5954C28.6678 15.5744 28.673 15.5552 28.6783 15.5343C28.6835 15.5133 28.687 15.4923 28.6923 15.4696C28.7709 15.1342 28.8617 14.7987 28.9788 14.4859C29.344 13.4778 29.952 12.5046 30.6823 11.7621C31.7831 10.6421 33.186 9.96596 34.7218 10.1162C35.5814 10.1651 36.5511 10.3993 37.25 10.7784C41.1707 12.9047 40.7619 18.4923 39.0811 22.1736C37.9 24.7524 36.0095 26.9102 33.9129 28.7745C33.394 29.234 32.8017 29.7407 32.2653 30.1687C29.807 32.0784 29.178 35.6934 31.1209 38.2844C33.2053 41.1324 37.3566 41.2704 39.7415 38.737C40.2098 38.274 40.6623 37.7935 41.1078 37.3095C45.6068 32.2846 49.6953 24.8258 50.3312 17.9524C50.5933 14.7393 50.022 11.528 48.612 8.60315H48.6137Z" fill="url(#paint01212)"></path>
  <path d="M79.9514 12.3423C81.7964 12.3423 83.278 12.9311 84.3945 14.1087C85.511 15.2863 86.0683 16.8535 86.0683 18.8121V28.4077H81.2391V19.2192C81.2391 18.4278 81.0399 17.8023 80.6433 17.3445C80.2467 16.8867 79.6718 16.6561 78.9205 16.6561C78.1256 16.6561 77.5088 16.9164 77.0703 17.4371C76.63 17.9578 76.4098 18.6776 76.4098 19.5931V28.4077H71.5806V19.2192C71.5806 18.4278 71.3814 17.8023 70.9848 17.3445C70.5882 16.8867 70.0134 16.6561 69.2621 16.6561C68.4671 16.6561 67.8503 16.9164 67.4118 17.4371C66.9715 17.9578 66.7514 18.6776 66.7514 19.5931V28.4077H61.9221V12.7791H66.7514V14.217C67.6319 12.966 69.0699 12.3423 71.0652 12.3423C72.9329 12.3423 74.3377 13.0307 75.2829 14.4057C76.2701 13.0307 77.8268 12.3423 79.9514 12.3423Z" fill="#597196"></path><path d="M103.002 26.4541C101.349 28.0475 99.3314 28.846 96.9499 28.846C94.5685 28.846 92.5505 28.0493 90.8977 26.4541C89.2448 24.8606 88.4184 22.9073 88.4184 20.594C88.4184 18.2807 89.2448 16.3273 90.8977 14.7339C92.5505 13.1405 94.5685 12.3438 96.9499 12.3438C99.3314 12.3438 101.349 13.1405 103.002 14.7339C104.655 16.3273 105.481 18.2807 105.481 20.594C105.481 22.9073 104.655 24.8606 103.002 26.4541ZM94.3099 23.2497C95.0175 23.9381 95.8981 24.2806 96.9499 24.2806C98.0017 24.2806 98.8806 23.9364 99.5899 23.2497C100.298 22.5613 100.652 21.6772 100.652 20.5922C100.652 19.5072 100.298 18.6232 99.5899 17.9348C98.8823 17.2464 98.0017 16.9039 96.9499 16.9039C95.8981 16.9039 95.0175 17.2481 94.3099 17.9348C93.6023 18.6214 93.2476 19.509 93.2476 20.5922C93.2476 21.6755 93.6023 22.5613 94.3099 23.2497Z" fill="#597196"></path><path d="M112.76 28.4094H107.629V12.6952H112.503V16.4831C113.277 13.5845 115.311 12.3003 117.249 12.3003C117.893 12.3003 118.605 12.3335 119.476 12.7284L118.218 17.6694C117.153 17.2745 116.379 17.2745 115.895 17.2745C113.959 17.2745 112.764 18.3945 112.764 23.0053V28.4111L112.76 28.4094Z" fill="#597196"></path><path d="M132.273 12.7783H137.102V28.4069H132.273V26.5566C131.663 28.1291 129.537 28.8437 127.477 28.8437C125.417 28.8437 123.539 28.047 122.036 26.4518C120.533 24.8584 119.782 22.905 119.782 20.5917C119.782 18.2785 120.533 16.3251 122.036 14.7317C123.539 13.1382 125.352 12.3048 127.477 12.3415C131.139 12.4044 132.362 14.1516 132.273 15.0252V12.7783ZM125.674 23.3733C126.381 24.0617 127.304 24.4041 128.443 24.4041C129.582 24.4041 130.503 24.0599 131.212 23.3733C131.922 22.6866 132.275 21.7589 132.275 20.5917C132.275 19.4246 131.92 18.4969 131.212 17.8102C130.505 17.1236 129.58 16.7794 128.443 16.7794C127.306 16.7794 126.383 17.1236 125.674 17.8102C124.966 18.4986 124.611 19.4246 124.611 20.5917C124.611 21.7589 124.966 22.6866 125.674 23.3733Z" fill="#597196"></path><path d="M140.672 28.4074V5.59082H145.501V28.4074H140.672Z" fill="#597196"></path><path d="M153.59 10.5756C153.021 11.1277 152.339 11.4038 151.546 11.4038C150.753 11.4038 150.07 11.1277 149.502 10.5756C148.932 10.0235 148.649 9.36132 148.649 8.59081C148.649 7.8203 148.934 7.15811 149.502 6.606C150.07 6.05389 150.751 5.77783 151.546 5.77783C152.341 5.77783 153.021 6.05389 153.59 6.606C154.158 7.15811 154.443 7.8203 154.443 8.59081C154.443 9.36132 154.158 10.0235 153.59 10.5756ZM149.132 28.4075V12.7788H153.961V28.4075H149.132Z" fill="#597196"></path><path d="M162.08 17.3424C162.08 17.6552 162.354 17.9102 162.901 18.1077C163.448 18.3051 164.108 18.5043 164.881 18.7017C165.653 18.8992 166.425 19.1543 167.199 19.467C167.971 19.7797 168.632 20.2952 169.179 21.0133C169.726 21.7314 170 22.6329 170 23.7162C170 25.404 169.355 26.6812 168.068 27.5443C166.78 28.4091 165.192 28.8407 163.303 28.8407C159.912 28.8407 157.605 27.6019 156.382 25.1209L160.567 22.8076C160.997 24.0377 161.907 24.6509 163.303 24.6509C164.461 24.6509 165.041 24.3277 165.041 23.6812C165.041 23.3685 164.767 23.1081 164.22 22.9002C163.673 22.6923 163.013 22.4896 162.241 22.2905C161.468 22.093 160.696 21.8327 159.922 21.5095C159.15 21.1862 158.489 20.6813 157.943 19.9929C157.396 19.3045 157.121 18.4606 157.121 17.4612C157.121 15.8363 157.728 14.5749 158.94 13.6786C160.153 12.7822 161.65 12.335 163.431 12.335C164.762 12.335 165.974 12.6215 167.068 13.1946C168.162 13.7677 169.042 14.5958 169.708 15.6791L165.588 17.8351C165.073 16.9178 164.353 16.4601 163.431 16.4601C162.508 16.4601 162.078 16.7519 162.078 17.3354L162.08 17.3424Z" fill="#597196"></path><defs><radialGradient id="paint01212" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34.5075 37.7962) rotate(-125.286) scale(43.6181 66.287)"><stop offset="0.0001" stopColor="#09FFD0"></stop><stop offset="1" stopColor="#009EFF"></stop></radialGradient><clipPath id="clip0_2005_54716"><rect width="170" height="40.5348" fill="white"></rect></clipPath></defs></svg>


  </div>
);

export const Fotlogolook=()=>(
  <div style={{ display: "flex" }}>
  <svg  width="40" height="31"viewBox="0 0 148 148" focusable="false" class="chakra-icon css-1nv7uwu"><path fill-rule="evenodd" clip-rule="evenodd" d="M74 86C61.3026 86 51 75.7077 51 63C51 50.2923 61.3026 40 74 40C86.6974 40 97 50.2923 97 63C97 75.7077 86.6974 86 74 86ZM64 63C64 68.5251 68.4794 73 74 73C79.5206 73 84 68.5251 84 63C84 57.4749 79.5206 53 74 53C68.4794 53 64 57.4749 64 63Z" fill="#04CD58"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0 63.0304L44 19H104L148 63.0304L74 137L0 63.0304ZM108 46.9998C89.3047 28.2224 58.6953 28.2225 40 46.9999L24 63.0001L40 79.0002C58.6953 97.7776 89.3047 97.7775 108 79.0001L124 63.0001L108 46.9998Z" fill="#04CD58"></path></svg>
   </div> 
);

export const Fotlogosea=()=>(
  <div style={{ display: "flex" }}>
  <div height="40" width="40" class="sc-1xf18x6-0 dfbMdI">
    <div style={{
  display:"block", 
  overflow:"hidden",
  position: "absolute",
  top:"0px",
  left:"0px",
  bottom:"0px",
  right:"0px",
  boxSizing: "border-box",
  margin:"0px"
}}
>
      <img alt="OpenSea Logo" src="/static/images/logos/opensea.svg" decoding="async" data-nimg="fill" style={{ height: "75px",
position: "absolute",
top:"0px",
left: "0px",
bottom: "0px", right: "0px",
boxSizing: "border-box",
padding:"0px", border: "none",
margin:"auto", display: "block", width:"0px",
height: "0px", minWidth:"100%",maxWidth: "100%", minHeight: "100%",
maxHeight: "100%"
}}
 />
      <noscript>
    <img alt="OpenSea Logo" src="/static/images/logos/opensea.svg" decoding="async" data-nimg="fill" style={{
  position: "absolute",
  top:"0px",
  left:"0px",
  bottom:"0px",
  right:"0px",
  boxSizing:"border-box",
  padding:"0px",
  border:"none",
  margin: "auto",
  display: "block",
  width: "0px",
  height: "0px",
  minWidth: "100%",
  maxWidth:"100%",
  minHeight: "100%",
  maxHeight: "100%"
}} loading="lazy" />
      </noscript></div></div>
    </div> 
    );

export const Fotlogorari = () => (
   <div style={{ display: "inline" }}>
<div class="sc-bdvvtL sc-gsDKAQ sc-dkPtRN sc-jRQBWg dPQJwp fEuCYr dJQyXW"><div class="sc-bdvvtL sc-gsDKAQ sc-dkPtRN sc-fotOHu qfAKJ fEuCYr hokLtX"><div class="sc-bdvvtL sc-gsDKAQ sc-dkPtRN gRTeDQ fEuCYr"><svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.7927 3.74115C18.7927 5.56401 17.7277 6.47067 16.5308 6.78561C17.9633 7.21508 19 8.38897 19 10.25V13.6667H13.5337V10.4218C13.5337 9.42924 12.9494 9.0284 11.9504 9.0284H5.46627V13.6667H0V0H12.9871C16.248 0 18.7927 0.706239 18.7927 3.74115ZM5.46871 3.81832H12.8585V3.81891C12.8695 3.81852 12.8806 3.81832 12.8917 3.81832C13.3998 3.81832 13.8118 4.23545 13.8118 4.75C13.8118 5.26455 13.3998 5.68168 12.8917 5.68168C12.8806 5.68168 12.8695 5.68148 12.8585 5.68109V5.68168H5.46871V3.81832Z" fill="black"></path></svg></div></div>
<svg width="54" height="10" viewBox="0 0 84 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="rgba(4, 4, 5, 1)"><path fill-rule="evenodd" clip-rule="evenodd" d="M62.8394 13.0771C62.8394 17.0643 60.5283 19.8088 56.6072 19.8088C54.9972 19.8088 53.5171 19.1356 52.8679 18.0999V19.6016H49.5961V1.27072H52.8679V8.00241C53.621 7.01855 55.0232 6.34538 56.6591 6.34538C60.5283 6.34538 62.8394 9.08984 62.8394 13.0771ZM52.6602 13.0771C52.6602 15.4332 54.0365 16.9866 56.1398 16.9866C58.2172 16.9866 59.5935 15.4332 59.5935 13.0771C59.5935 10.721 58.2172 9.16751 56.1398 9.16751C54.0365 9.16751 52.6602 10.721 52.6602 13.0771Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.1866 19.6016L12.19 11.4977C13.9817 10.6174 15.0464 8.88271 15.0464 6.83731C15.0464 3.57503 12.7353 1.47785 9.17781 1.47785H0.5L0.525967 19.6016H4.05751V12.1709H8.58057L12.0838 19.6016H16.1866ZM4.05751 4.50711H8.6325C10.4502 4.50711 11.4889 5.38741 11.4889 6.83731C11.4889 8.28721 10.4502 9.14162 8.6325 9.14162H4.05751V4.50711Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M26.9328 6.55251H30.2047V19.6016H26.9328V18.0999C26.2836 19.1356 24.8294 19.8088 23.1935 19.8088C19.2725 19.8088 16.9614 17.0643 16.9614 13.0771C16.9614 9.08984 19.2725 6.34538 23.1416 6.34538C24.7775 6.34538 26.1797 7.01855 26.9328 8.00241V6.55251ZM20.2073 13.0771C20.2073 15.4332 21.5835 16.9866 23.6609 16.9866C25.7643 16.9866 27.1405 15.4332 27.1405 13.0771C27.1405 10.721 25.7643 9.16751 23.6609 9.16751C21.5835 9.16751 20.2073 10.721 20.2073 13.0771Z"></path><path d="M41.7722 6.55251L41.5645 9.71122C41.0971 9.50409 40.4739 9.40053 39.9026 9.40053C38.0589 9.40053 36.397 10.9281 36.397 14.8118V19.6016H33.1252V6.55251H36.397V8.93449C37.0462 7.4587 38.76 6.34538 40.344 6.34538C40.8114 6.34538 41.3827 6.42305 41.7722 6.55251Z"></path><path d="M46.6865 19.6016H43.4147V6.55251H46.6865V19.6016Z"></path><path d="M65.0587 19.6016H68.3306V1.27072H65.0587V19.6016Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M83.5746 12.6369C83.5746 9.60766 81.4193 6.34538 77.0049 6.34538C72.6684 6.34538 70.539 9.68533 70.539 13.0771C70.539 16.4688 72.8501 19.8088 77.1866 19.8088C80.2508 19.8088 82.5359 18.3589 83.263 15.8992L80.1988 15.0707C79.8613 16.3393 78.7706 17.0643 77.2386 17.0643C75.3689 17.0643 74.0965 15.8992 73.8109 13.9315H83.5226C83.5486 13.6726 83.5746 13.103 83.5746 12.6369ZM73.8888 11.5495C74.2523 9.78889 75.3949 8.83093 77.0049 8.83093C78.9005 8.83093 79.9132 9.99602 80.069 11.5495H73.8888Z"></path><path d="M43.0271 1.94336C43.0271 1.11493 43.6987 0.443359 44.5271 0.443359H45.6004C46.4288 0.443359 47.1004 1.11493 47.1004 1.94336V3.0166C47.1004 3.84503 46.4288 4.5166 45.6004 4.5166H44.5271C43.6987 4.5166 43.0271 3.84503 43.0271 3.0166V1.94336Z"></path></g></svg></div>
  </div>
);


export default App;
