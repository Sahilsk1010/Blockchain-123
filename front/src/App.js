import abi from "./contract/June.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import RequestLetter from "./components/RequestLetter";
import GetStudents from "./components/GetStudents";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x78C38f8e11c0170AdBe776E46D08b452e2134701";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-teal-400">
          Student Credit Management
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-gray-800 rounded-lg shadow-lg">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-teal-400">
                Add Student
              </h2>
              <RequestLetter state={state} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-teal-400">
                Get Details
              </h2>
              <GetStudents state={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
