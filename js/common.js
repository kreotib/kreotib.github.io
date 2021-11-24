const Web3Modal = window.Web3Modal.default,
    WalletConnectProvider = window.WalletConnectProvider.default,
    evmChains = window.evmChains;

let web3Modal, provider, selectedAccount;
const initWalletConnect = () => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    // Mikko's test key - don't copy as your mileage may vary
                    infuraId: "95c0f8ed605140dcaf0e238032fe300a",
                }
            }
        };
        web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions, // required
            disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
        });
    },
    fetchAccountData = async () => {
        const web3 = new Web3(provider),
            chainId = await web3.eth.getChainId(),
            chainData = evmChains.getChain(chainId),
            accounts = await web3.eth.getAccounts();
        console.log("Got accounts", accounts);
        selectedAccount = accounts[0];
        localStorage.setItem('account',accounts[0]);
    };
let onConnect = async (e) => {
    e.preventDefault();
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

document.addEventListener('DOMContentLoaded', () => {
    // Language scripts
    const languageChangeTrigger = document.querySelector('.language-change__current'),
        languageChange = document.querySelector('.language-change');

    languageChangeTrigger.addEventListener('click', (event) => {
        languageChange.classList.toggle('open');
    });
    document.body.addEventListener('click', (event) => {
        !(event.target === languageChange || languageChange.contains(event.target)) && languageChange.classList.contains('open') ? languageChange.classList.toggle('open') : null;
    });
    //wallet scripts
    initWalletConnect();
    document.querySelector(".btn-connect").addEventListener("click", onConnect);
    document.querySelector(".btn-connect").addEventListener("tap", onConnect);
});