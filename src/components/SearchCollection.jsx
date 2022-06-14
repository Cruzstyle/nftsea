import { Select } from 'antd';
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getCollectionsByChain } from "helpers/collections";


function SearchCollection({setInputValue}){
    const { Option } = Select;
    const { chainId } = useMoralisDapp();
    const NFTCollections = getCollectionsByChain(chainId);



    function onChange(value) {
        setInputValue(value);
    }

    return (
        <>
        <Select
            showSearch
            style={{width: "100px",
                    height:"25px",
                    marginLeft: "10px" }}
            placeholder="Find NFT Collection"
            optionFilterProp="children"
            onChange={onChange}
        >
        {NFTCollections &&
            NFTCollections.map((collection, i) =>
            <Option value={collection.addrs} key= {i}>{collection.name}</Option>
            )
            }
        </Select>

        </>
    )
}

export default SearchCollection;
