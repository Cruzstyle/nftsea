import React, { useState, useEffect } from "react";
import { getNativeByChain } from "helpers/networks";
import { getCollectionsByChain } from "helpers/collections";
import {
  useMoralis,
  useMoralisQuery,
} from "react-moralis";
import { useWeb3Transfer } from "react-moralis";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { Card, Image, Tooltip, Modal, Badge, Alert, Spin } from "antd";
import MediaQuery from 'react-responsive'
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import {
  FileSearchOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import styled from "styled-components";
const { Meta } = Card;
const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
  banner: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    marginLeft: "15px",
    width: "600px",
    borderRadius: "10px",
    height: "150px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    positon: "relative",
    marginTop: "-80px",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
  },
};

function NFTTokenIds({ inputValue, setInputValue }) {
  const fallbackImg =
    "data:image/png;base64,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";
  const { NFTTokenIds, totalNFTs, fetchSuccess, nfttokenIdsSet} = useNFTTokenIds(inputValue);
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(true);
  const [prix, setPrix] = useState(true);
  const [owner, setOwner] = useState(true);
  const [timeStamp, setTimeStamp] = useState(true);
  const [collection, setCollection]= useState(true);
  const [loading, setLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const Transfer = useWeb3Transfer();
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
const nativeName = getNativeByChain(chainId);
const { Moralis, initialize, isInitialized  } = useMoralis();
const [values, setValues] = useState(true);
  const contractABIJson = JSON.parse(contractABI);

  const queryMarketItems = useMoralisQuery("MarketItems");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  const purchaseItemFunction = "createMarketSale";
  const NFTCollections = getCollectionsByChain(chainId);


 const handleBuyClick = async (nft) => {
    setNftToBuy(nft)
    console.log(nft.metadata.attributes)
    console.log(nft.token_id)
    const adx = (nft.token_address).toString()
    const Tox =  (nft.token_id).toString()
    console.log(Tox)
     setVisibility(true)


    const options = {
      address: adx,
      limit: 100,
      chain: chainId,
    };

  const nFTTrades = await Web3Api.token.getNFTTrades(options);
    console.log(nFTTrades);
    console.log(nFTTrades.result?.[0].price / ("1e" + 18));
    console.log(nFTTrades.result?.[0].buyer_address)
    console.log(nFTTrades.result?.[0].block_timestamp)
    let data = nFTTrades.result



  const Dat = data.filter(function(token_id){
       if( token_id.token_ids == Tox )
        return  token_id.token_ids == Tox
    }).map(function({buyer_address, price,  block_timestamp, token_ids}){
        return { buyer_address, price,  block_timestamp,  token_ids};
    });
    //console.log(Dat);

   const prix = (nFTTrades.result?.[1].price / ("1e" + 18)).toString()
   setPrix(prix)
   const owner = (nFTTrades.result?.[1].buyer_address).toString()
   setOwner(owner)
   const timeStamp = (nFTTrades.result?.[1].block_timestamp).toString()
   setTimeStamp(timeStamp)


  }

  const handleMediaQueryChange = (matches) => {
      // matches will be true or false based on the value for the media query
    }

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(7),
    receiver: "0x6afe9b78ceD5Cc2828278cD280d7f59Ad9731e4E",
  });




  const getMarketItem = (nft) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    return result;
  };

  return (
    <>
      <div>
        {contractABIJson.noContractDeployed && (
          <>
            <Alert
              message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
              type="error"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}
        {inputValue !== "explore" && totalNFTs !== undefined && (
          <>
            {!fetchSuccess && (
              <>
                <Alert
                  message="Unable to fetch all NFT metadata... We are searching for a solution !"
                  type="warning"
                />
                <div style={{ marginBottom: "10px" }}></div>
              </>
            )}
           <div>
            <MediaQuery minWidth={1224} onChange={handleMediaQueryChange}>
            <div style={styles.banner}>
              <Image
                preview={true}
                src={NFTTokenIds[0]?.image || "error"}
                fallback={fallbackImg}
                alt=""
                 style={styles.logo}
              />
              <div style={styles.text}>
                <>
                  <div>{`${NFTTokenIds[0]?.name}`}</div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#9c9c9c",
                      fontWeight: "normal",
                    }}
                  >
                    Collection Size: {`${totalNFTs}`}

                  </div>
                </>
              </div>
            </div>
              </MediaQuery>



              <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}>
              <div style={{  display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: "0 auto",
                width: "250px",
                borderRadius: "10px",
                height: "70px",
                marginBottom: "40px",
                paddingBottom: "20px",
                borderBottom: "solid 1px #e3e3e3",}}>
                <Image
                  preview={true}
                  src={NFTTokenIds[0]?.image || "error"}
                  fallback={fallbackImg}
                  alt=""
                   style={{  height: "75px",
                     width: "90px",
                     borderRadius: "50%",
                     positon: "relative",
                     marginTop: "-55px",
                     border: "solid 4px white",}}
                />
                <div style={{color: "#041836",
                fontSize: "11px",
                fontWeight: "bold",}}>
                  <>
                    <div>{`${NFTTokenIds[0]?.name}`}</div>
                    <div
                      style={{
                        fontSize: "9.5px",
                        color: "#9c9c9c",
                        fontWeight: "normal",
                      }}
                    >
                      Collection Size: {`${totalNFTs}`}

                    </div>
                  </>
                </div>
              </div>
                </MediaQuery>
              </div>
          </>

        )}

        <div style={styles.NFTs}>
          {inputValue === "explore" &&
            NFTCollections?.map((nft, index) => (
             <div>
          <MediaQuery minWidth={1224} onChange={handleMediaQueryChange}>
              <Card
                hoverable
                actions={[
                  <Tooltip title="View Collection">
                    <RightCircleOutlined
                      onClick={() => setInputValue(nft?.addrs)}
                    />
                  </Tooltip>,
                ]}
                style={{ width: 240, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview={false}
                    src={nft?.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{ height: "240px" }}
                  />
                }
                key={index}

              >
                <Meta title={nft.name} />
              </Card>
              </MediaQuery>


              <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}>
                  <Card
                    hoverable
                    actions={[
                      <Tooltip title="View Collection">
                        <RightCircleOutlined
                          onClick={() => setInputValue(nft?.addrs)}
                        />
                      </Tooltip>,
                    ]}
                    style={{ width: "90px", border: "2px solid #e7eaf3" }}
                    cover={
                      <Image
                        preview={false}
                        src={nft?.image || "error"}
                        fallback={fallbackImg}
                        alt=""
                        style={{ height: "55px" }}
                      />
                    }
                    key={index}

                  >
                    <Meta description = {nft.name}
                    style={{ fontSize:"7px", fontWeight:"bold"}}
                    />
                  </Card>
             </MediaQuery>

              </div>

            ))}

          {inputValue !== "explore" &&
            NFTTokenIds.slice(15, 160).map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Tooltip title="View On Blockexplorer">
                    <FileSearchOutlined
                      onClick={() =>
                        window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )
                      }
                    />
                  </Tooltip>,
                  <Tooltip title="Buy NFT">
                    <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                  </Tooltip>,
                ]}
                style={{ width: 240, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview={false}
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{ height: "240px" }}
                  />
                }
                key={index}
              >
                {getMarketItem(nftToBuy) && (
                  <Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>
                )}
                <Meta title={nft.name} description={`#${nft.token_id}`}  eth={`#${nft.tokenPrice}`} />
              </Card>
            ))}
        </div>
        {getMarketItem(nftToBuy) ? (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}   `}
            visible={visible}
            onCancel={() => setVisibility(false)}
            okText="Buy"
          >
            <Spin spinning={loading}>
              <div
                style={{
                  width: "250px",
                  margin: "auto",
                }}
              >
                <Badge.Ribbon
                  color="green"
                  text={`${
                    getMarketItem(nftToBuy).price / ("1e" + 18)
                  } ${nativeName}`}
                >
                  <img
                    src={nftToBuy?.image}
                  />
                </Badge.Ribbon>
              </div>
            </Spin>
          </Modal>
         )
          : (
         <div>
          <MediaQuery minWidth={1224} onChange={handleMediaQueryChange}>
          <Modal
            title={`Buy ${nftToBuy?.name} : ID ${nftToBuy?.token_id}   `}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => fetch()}
          >
          <ul>
          <img
            src={nftToBuy?.image}
            style={{
              width: "200px",
              borderRadius: "10px",
              marginBottom: "15px",
              float: "left",
              marginTop:"0px",
            }}
          />
            <li style={{
                marginTop:"18px",
                marginLeft: "235px",
                listStyleType: "none",
            }}><img
              src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNTZweCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTU2IDI1NiIgd2lkdGg9IjE1NnB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iQ2xhc3NpYyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPjxnIGlkPSJFdGhlcmV1bSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1NzAuMDAwMDAwLCAtNDEwLjAwMDAwMCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1NzAuMDAwMDAwLCA0MTAuMDAwMDAwKSI+PHBhdGggZD0iTTAsMTI4IEw4MCwwIEw4MCw5My41MzU4MzcyIEwwLDEyOCBaIE0xNTYsMTI4IEw4MCw5My41ODA5NTczIEw4MCwwIEwxNTYsMTI4IFoiIGZpbGw9IiM4MjgzODQiIGlkPSJDb21iaW5lZC1TaGFwZSIvPjxwYXRoIGQ9Ik04MCwxNzYgTDAsMTMxLjAwMzk2IEw4MCw5NiBMODAsMTc2IFogTTE1NiwxMzEuMDExNDczIEw4MCwxNzYgTDgwLDk2IEwxNTYsMTMxLjAxMTQ3MyBaIiBmaWxsPSIjMzQzNTM1IiBpZD0iQ29tYmluZWQtU2hhcGUiLz48cGF0aCBkPSJNMCwxNDggTDgwLDE5NC4xODA3MTEgTDgwLDI1NiBMMCwxNDggWiBNMTU2LDE0OCBMODAsMjU2IEw4MCwxOTQuMTc1MzYxIEwxNTYsMTQ4IFoiIGZpbGw9IiM4MjgzODQiIGlkPSJDb21iaW5lZC1TaGFwZSIvPjxwb2x5Z29uIGZpbGw9IiMyRjMwMzAiIGlkPSJQYXRoLTMiIHBvaW50cz0iMTU2IDEyOCA4MCA5My41ODA5NTczIDgwIDAiLz48cG9seWdvbiBmaWxsPSIjMTMxMzEzIiBpZD0iUGF0aC01IiBwb2ludHM9IjE1NiAxMzEuMDExNDczIDgwIDk2IDgwIDE3NiIvPjxwb2x5Z29uIGZpbGw9IiMyRjMwMzAiIGlkPSJQYXRoLTciIHBvaW50cz0iMTU2IDE0OCA4MCAxOTQuMTc1MzYxIDgwIDI1NiIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="}
              style={{
                height:"25px",
              }}
              alt="ETH"
            /><li style={{
              listStyleType: "none",
              fontWeight: "bold",
              fontSize:"15px",
            }} > {prix}</li></li>
            <li style={{
              marginLeft: "235px",
              marginTop:"27px",
              listStyleType: "none",
              fontWeight: "bold"
            }}>Owner :<li  style={{
              listStyleType: "none",
              fontWeight: "bold",
              fontSize:"15px"
              }}  > {owner}</li></li>
            <li style={{
              marginLeft: "235px",
              marginTop:"39px",
              listStyleType: "none",
              fontWeight: "bold",
            }}>TimeStamp :<li  style={{
              listStyleType: "none",
              fontWeight: "bold",
              fontSize:"15px"
              }}  >
            {timeStamp}</li></li>

            <button style={{
                    marginLeft: "100px",
                     borderRadius: "5px",
                     borderColor:"#48F8F8",
                     backgroundColor: " #9CF4F4 ",
                    }}  onClick={() => fetch()} disabled={isFetching} >
            Buy Asset
           </button>

          </ul>




           <div>


            </div>
           <div>
           <ul>
             {
              nftToBuy?.metadata?.attributes.map((trait) => (
                  <div>
                  <h5 style={{
           backgroundColor: "#C3F1F1",
           borderRadius: "26px",
           width: "100%",
           floatRight: "60px",
           fontWeight: "light",
           fontSize: "14px",
           marginTop: "5px",
           border: "1px solid #15b2e5",
           padding: "10px",
           textAlign: "center",
         }} key={trait}> {`trait-type: ${trait.trait_type}       value: ${trait.value} `} </h5>


                  </div>
                ))
             }
           </ul>
          </div>

          </Modal>
          </MediaQuery>







          <MediaQuery maxWidth={1224} onChange={handleMediaQueryChange}>
          <Modal
            title={`Buy ${nftToBuy?.name} : ID ${nftToBuy?.token_id}   `}
            style={{fontSize: "5px"}}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => fetch()}
          >
          <ul>
          <img
            src={nftToBuy?.image}
            style={{
              width: "80px",
              borderRadius: "10px",
              marginBottom: "15px",
              float: "left",
              marginTop:"0px",
              marginLeft:"0px",
            }}
          />
            <li style={{
                marginTop:"8px",
                marginLeft: "95px",
                listStyleType: "none",
            }}><img
              src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNTZweCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTU2IDI1NiIgd2lkdGg9IjE1NnB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iQ2xhc3NpYyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPjxnIGlkPSJFdGhlcmV1bSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1NzAuMDAwMDAwLCAtNDEwLjAwMDAwMCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1NzAuMDAwMDAwLCA0MTAuMDAwMDAwKSI+PHBhdGggZD0iTTAsMTI4IEw4MCwwIEw4MCw5My41MzU4MzcyIEwwLDEyOCBaIE0xNTYsMTI4IEw4MCw5My41ODA5NTczIEw4MCwwIEwxNTYsMTI4IFoiIGZpbGw9IiM4MjgzODQiIGlkPSJDb21iaW5lZC1TaGFwZSIvPjxwYXRoIGQ9Ik04MCwxNzYgTDAsMTMxLjAwMzk2IEw4MCw5NiBMODAsMTc2IFogTTE1NiwxMzEuMDExNDczIEw4MCwxNzYgTDgwLDk2IEwxNTYsMTMxLjAxMTQ3MyBaIiBmaWxsPSIjMzQzNTM1IiBpZD0iQ29tYmluZWQtU2hhcGUiLz48cGF0aCBkPSJNMCwxNDggTDgwLDE5NC4xODA3MTEgTDgwLDI1NiBMMCwxNDggWiBNMTU2LDE0OCBMODAsMjU2IEw4MCwxOTQuMTc1MzYxIEwxNTYsMTQ4IFoiIGZpbGw9IiM4MjgzODQiIGlkPSJDb21iaW5lZC1TaGFwZSIvPjxwb2x5Z29uIGZpbGw9IiMyRjMwMzAiIGlkPSJQYXRoLTMiIHBvaW50cz0iMTU2IDEyOCA4MCA5My41ODA5NTczIDgwIDAiLz48cG9seWdvbiBmaWxsPSIjMTMxMzEzIiBpZD0iUGF0aC01IiBwb2ludHM9IjE1NiAxMzEuMDExNDczIDgwIDk2IDgwIDE3NiIvPjxwb2x5Z29uIGZpbGw9IiMyRjMwMzAiIGlkPSJQYXRoLTciIHBvaW50cz0iMTU2IDE0OCA4MCAxOTQuMTc1MzYxIDgwIDI1NiIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="}
              style={{
                height:"9px",
              }}
              alt="ETH"
            /><li style={{
              listStyleType: "none",
              fontWeight: "bold",
              fontSize:"7px",
            }} > {prix}</li></li>
            <li style={{
              marginLeft: "95px",
              marginTop:"11px",
              fontSize:"5px",
              listStyleType: "none",
              fontWeight: "bold"
            }}>Owner :<li  style={{
              listStyleType: "none",
              fontWeight: "bold",
              fontSize:"5.5px"
              }} > {owner}</li></li>
            <li style={{
              marginLeft: "95px",
              marginTop:"18px",
              listStyleType: "none",
              fontSize:"5px",
              fontWeight: "light",
            }}>TimeStamp :<li  style={{
              listStyleType: "none",
              fontWeight: "bold",
              fontSize:"5.5px",
              }}  >
            {timeStamp}</li></li>

            <button style={{
                    marginLeft: "20px",
                    width:"46px",
                    height:"15px",
                    fontSize:"7px",
                     borderRadius: "5px",
                     borderColor:"#48F8F8",
                     backgroundColor: " #9CF4F4 ",
                    }}  onClick={() => fetch()} disabled={isFetching} >
            Buy Asset
           </button>

          </ul>



           <div>


            </div>
           <div>
           <ul>
             {
              nftToBuy?.metadata?.attributes.map((trait) => (
                  <div>
                  <h5 style={{
           backgroundColor: "#C3F1F1",
           borderRadius: "20px",
           width: "100%",
           floatRight: "30px",
           fontWeight: "light",
           fontSize: "7px",
           marginTop: "3px",
           border: "1px solid #15b2e5",
           padding: "10px",
           textAlign: "center",
         }} key={trait}> {`trait-type: ${trait.trait_type}       value: ${trait.value} `} </h5>


                  </div>
                ))
             }
           </ul>
          </div>

          </Modal>
          </MediaQuery>
          </div>
        )}
      </div>
    </>
  );
}



export default NFTTokenIds;
