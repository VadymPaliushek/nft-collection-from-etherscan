/* Moralis init code */

const serverUrl = "https://qwc8bpvxdutd.usemoralis.com:2053/server";
const appId = "QbZQTZCfdk5WZRfgVdC5ccEEW9x30Di8KYd8EUAq";

Moralis.start({ serverUrl, appId });

let pages = 0
let nftMetadata
const nftNames = []
let nft_address
let page_number = 0
let page_loading = false
const tableElement = document.getElementById('eth_table');

async function search() {

    const results = await Moralis.Cloud.run("getAvgGas");
    clearTable()
    pages = 1
    console.log("start search")
    nft_address = document.getElementById("nft_address").value; 
    const options = {
        chain: "eth",
        address: nft_address,
        limit: "100"
    };
    const balanceData = await Moralis.Web3API.account.getNativeBalance(options);
    console.log("balances===", balanceData)
    let balance = Number(balanceData.balance) / (10 ** 18)
    document.getElementById("balance_eth").innerHTML = balance + "ETH";
    nftMetadata = await Moralis.Web3API.account.getNFTTransfers(options);
    const count = nftMetadata.result.length;
    document.getElementById("number_transaction").innerHTML = count;
    for (let i = 0; i < count; i ++){
        const option = {
            chain: "eth",
            address: nftMetadata.result[i].token_address,
        };
        const tokenMetadata = await Moralis.Web3API.token.getNFTMetadata(option);
        console.log(tokenMetadata)
        if(tokenMetadata != null){
            nftNames.push(tokenMetadata.name);
        } else {
            nftNames.push(nftMetadata.result[i].token_address);
        }
        await sleep(300);
    }
    page_number = (count / 20).toFixed(0)
    if(nftMetadata.result.length != 0){
        console.log("count=====", count)
        createTable(pages)
        page_loading = true
    } else {
        const tbodyElement = document.createElement('tbody');
        const trElement = document.createElement('tr');
        trElement.innerHTML = "No match data"
        tbodyElement.appendChild(trElement);
        tableElement.appendChild(tbodyElement);
    }
    console.log(nftMetadata)
    console.log("exit search")
}

async function clearTable() {
    let tableHeaderRowCount = 1;
    let rowCount = tableElement.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        await tableElement.deleteRow(tableHeaderRowCount);
    }
}

async function createTable(counts) {
    for (let i = (counts - 1) * 20; i < counts * 20; i ++){
        const trElement = document.createElement('tr');
        const tbodyElement = document.createElement('tbody');
        const dateEle = document.createElement('td');
        const hashEle = document.createElement('td');
        const typeEle = document.createElement('td');
        const nameEle = document.createElement('td');
        const idEle = document.createElement('td');
        const amountEle = document.createElement('td');
        const timestamp = nftMetadata.result[i].block_timestamp;
        let timedate = timestamp.replace("T", "  ")
        let strlength = timedate.length
        dateEle.innerHTML = timedate.substr(0, strlength - 5);
        hashEle.innerHTML = nftMetadata.result[i].transaction_hash;
        if (nft_address.toLowerCase() == nftMetadata.result[i].to_address.toLowerCase()){
            typeEle.innerHTML = "Buy";
        } else {
            typeEle.innerHTML = "Sell";
        }
        // const options = {
        //     chain: "eth",
        //     address: nft_address,
        //     token_address: nftMetadata.result[i].token_address,
        //     limit: "1"
        // };
        // const tokenMetadata = await Moralis.Web3API.account.getNFTsForContract(options);
        // console.log("tokendata====", tokenMetadata)
        // if(tokenMetadata.result[0] != null
        //     ){
        //     nameEle.innerHTML = tokenMetadata.result[0].name;
        // } else {
        //     nameEle.innerHTML = nftMetadata.result[i].token_address;
        // }
        nameEle.innerHTML = nftNames[i];
        idEle.innerHTML = nftMetadata.result[i].token_id;
        amountEle.innerHTML = (Number(nftMetadata.result[i].value) / (10 ** 18)).toFixed(4);
        trElement.appendChild(dateEle);
        trElement.appendChild(hashEle);
        trElement.appendChild(typeEle);

        trElement.appendChild(nameEle);
        trElement.appendChild(idEle);
        trElement.appendChild(amountEle);
        tbodyElement.appendChild(trElement);
        tableElement.appendChild(tbodyElement);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function previouspage() {
    if(page_loading && pages > 1) {
        
        clearTable()
        pages -= 1 
        createTable(pages)
    }
}

function nextpage() {
    if(page_loading && pages < page_number) {
        
        clearTable()
        pages += 1 
        createTable(pages)
    }
}

document.getElementById("search_btn").onclick = search;
document.getElementById("prev_btn").onclick = previouspage;
document.getElementById("next_btn").onclick = nextpage;
