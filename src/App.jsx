import { useState, useEffect } from "react";
import { createWalletClient, custom, getContract } from "viem";
import { sepolia } from "viem/chains";
import { MoodContractAddress, MoodContractABI } from "./contractInfo";

function App() {
  const [address, setAddress] = useState(null);
  const [mood, setMood] = useState("");
  const [currentMood, setCurrentMood] = useState("");

  // Initialize wallet client
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });

  // Connect wallet on page load
  useEffect(() => {
    async function connect() {
      try {
        const accounts = await walletClient.requestAddresses();
        setAddress(accounts[0]);
      } catch (err) {
        console.log("Connect wallet manually", err);
      }
    }
    connect();
  }, []);

  // Setup contract instance
  const MoodContract = getContract({
    address: MoodContractAddress,
    abi: MoodContractABI,
    client: walletClient,
  });

  async function getMoodFromContract() {
    const mood = await MoodContract.read.getMood();
    setCurrentMood(mood);
  }

  async function setMoodOnContract() {
    if (!mood) return alert("Enter a mood first!");
    await MoodContract.write.setMood([mood], {
      account: address,
    });
    alert("Mood saved successfully!");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>This is my dApp!</h1>

      {!address && (
        <button
          onClick={async () => {
            const accounts = await walletClient.requestAddresses();
            setAddress(accounts[0]);
          }}
        >
          Connect Wallet
        </button>
      )}

      {address && <p>Connected as: {address}</p>}

      <div>
        <label>Input Mood:</label>
        <br />
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </div>

      <button onClick={getMoodFromContract}>Get Mood</button>
      <button onClick={setMoodOnContract}>Set Mood</button>

      <p>Your Mood: {currentMood}</p>
    </div>
  );
}

export default App;
