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
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();



  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (

    <Layout style={{ height: "100vh", overflow: "auto", overflowX:"auto"}}>
      <Router>
  
        <Header style={styles.header}>
          <Logo/>
          <SearchCollections setInputValue={setInputValue}/>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
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
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
   
        <div style={{ textAlign: "center", fontWeight: "Bold", marginTop: "35px", fontSize:"23px"}}> <Latest/> </div>
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

      <Footer style={{ textAlign: "center" }}>
     <Text style={{ display: "block" }}>
        Use a web3 browser to view Market Items ⭐️
       <a 
         target="_blank" 
         rel="noopener noreferrer"
         href="https://metamask.io/"
      > metamask.io 
      </a>
  
     </Text>
        <Text style={{ display: "block" }}>
            NFT metaverse ⭐️ built for the community by
        </Text>

        <Text style={{ display: "block" }}>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io/"
          >
           moralis.io
          </a>
          <Text> Decentralized NFT Market place</Text>
        </Text>
        <Text> Zero platform fees !</Text>

        <Text style={{ display: "block" }}>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplat"
          >

          </a>
        </Text>
      </Footer>
    </Layout>

  );

};
export const Latest = () =>(
  <div>
  <Text style={{ display: "block" }}>
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

export default App;
