const Web3Modal = window.Web3Modal.default,
    WalletConnectProvider = window.WalletConnectProvider.default,
    evmChains = window.evmChains;

let web3Modal, provider, selectedAccount;
const init = () => {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                // Mikko's test key - don't copy as your mileage may vary
                infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
            }
        }
    };
    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });
}

const fetchAccountData = async () => {

    const web3 = new Web3(provider),
        chainId = await web3.eth.getChainId(),
        chainData = evmChains.getChain(chainId),
        accounts = await web3.eth.getAccounts();

    console.log("Got accounts", accounts);
    selectedAccount = accounts[0];

};
let onConnect = async () => {

    try {
        provider = await web3Modal.connect();
    } catch (e) {
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        fetchAccountData();
    });

    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
    });

    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });
};


window.addEventListener('load', async () => {
    init();
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
    console.log('123');
});