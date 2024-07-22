import { useState } from "react";
import "./App.css";
import bitcoinLogo from "./assets/bitcoin.png";
import { random32ByteRange, findPrivateKey, toWIF } from "./bitcoin";

let sideEffect = 0;

enum LotteryState {
  Normal = "normal",
  Loading = "loading",
  Success = "success",
}

function App() {
  const [state, setState] = useState(LotteryState.Normal);
  const [text, setText] = useState("I wish you good luck!");

  const playLottery = async () => {
    const rangeStart = "20000000000000000";
    const rangeEnd = "3ffffffffffffffff";
    const start = random32ByteRange(rangeStart, rangeEnd);
    const result = await findPrivateKey(
      start,
      "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so"
    );

    if (result.success) {
      /**
       * In case the Private key is found
       */
      setState(LotteryState.Success);
      const wif =
        result.privateKey &&
        toWIF(result.privateKey.toString(16).padStart(64, "0"));
      setText(
        `This is the private key: ${result.privateKey}\n. This is the WIF: ${wif}`
      );
    } else {
      /**
       * The key WAS NOT found
       */
      setState(LotteryState.Normal);
      setText(`shhh! No key found, start = ${start}, Keep trying!`);
    }
  };

  return (
    <>
      <div
        className="typewriter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Bitcoin Lottery</h1>
        <img src={bitcoinLogo} width={100} />
      </div>
      <div className="card">
        {state === LotteryState.Normal && (
          <button
            className="roll-button"
            onClick={() => {
              setState(LotteryState.Loading);
              setTimeout(() => {
                console.time("bitcoin");
                playLottery();
                console.timeEnd("bitcoin");
                console.timeStamp("bitcoin");
              }, 10);
            }}
          >
            Roll a ticket
          </button>
        )}

        {state === LotteryState.Loading && (
          <div className="spinner" style={{ fontSize: "5.8px" }}>
            <div className="head"></div>
          </div>
        )}

        {state == LotteryState.Success && (
          <div>
            <h1 className="success-title">YOU FOUND THE KEY!!!!</h1>
          </div>
        )}

        <p>{text}</p>
      </div>
      <p className="read-the-docs">
        This is a lottery to solve a puzzle of this address:
        <strong>13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so</strong>
        <br></br>
        It contains 6.6 BTC, each time you roll you try 50K keys, the
        possibilities is 36,893,488,147,419,103,231 keys.
        <strong>
          <br /> MUST READ:{" "}
          <a href="/education.html">Kangaroos and What to do If I found it?</a>
        </strong>
      </p>
      {
        /*The following code are the little bitcoins dropping in the screen*/
        [...new Array(window.innerWidth < 800 ? 4 : 10).keys()].map((i) => {
          let x = Math.random() * window.innerWidth;
          if (x < sideEffect + 50 && x > sideEffect - 50) {
            x += 50;
          }

          sideEffect = x;
          return (
            <img
              key={i}
              src={bitcoinLogo}
              className="flyingbitcoin"
              style={{
                left: x,
                animationDuration: `${Math.ceil(Math.random() * 3)}s`,
                animationDelay: `${Math.ceil(Math.random() * 3)}s`,
              }}
            />
          );
        })
      }
    </>
  );
}

export default App;
