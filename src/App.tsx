import { useEffect, useState } from "react";
import bitcoinLogo from "./assets/bitcoin.png";
import { random32ByteRange, findPrivateKey, toWIF } from "./bitcoin";

import englishContent from "./languages/english";
import ptContent from "./languages/portuguese";

let sideEffect = 0;

enum LotteryState {
  Normal = "normal",
  Loading = "loading",
  Success = "success",
}

function App() {
  const [state, setState] = useState(LotteryState.Normal);
  const [content, setContentLanguage] = useState(englishContent);
  const [text, setText] = useState(content["puzzle-state-initial"]);
  useEffect(() => {
    /**
     * A stupid workaround that checks the url params to set the language used in the application.
     */
    const queryParams = new URLSearchParams(window.location.search);
    let lang = queryParams.get("lang");

    if (!lang) {
      const userLang = navigator.language || "en";
      if (RegExp("^pt").test(userLang)) {
        lang = "pt";
      } else {
        lang = "en";
      }
    }

    if (lang) {
      switch (lang) {
        case "pt":
        case "pt-br":
          setContentLanguage(ptContent);
          break;
        default:
          setContentLanguage(englishContent);
          break;
      }
      setText(content["puzzle-state-initial"]);
    }
  }, [setContentLanguage, content, setText]);

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
      result.privateKey &&
        setText(
          content["puzzle-state-sucess-content"](
            result.privateKey.toString(16),
            wif || ""
          )
        );
    } else {
      /**
       * The key WAS NOT found
       */
      setState(LotteryState.Normal);
      setText(content["puzzle-state-not-found"](start));
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <a href="?lang=en">Read in English</a>
        <a href="?lang=pt">Ler em Portugues</a>
      </div>
      <div
        className="typewriter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{content.title}</h1>
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
            {content["roll-btn"]}
          </button>
        )}

        {state === LotteryState.Loading && (
          <div className="spinner" style={{ fontSize: "5.8px" }}>
            <div className="head"></div>
          </div>
        )}

        {state == LotteryState.Success && (
          <div>
            <h1 className="success-title">
              {content["puzzle-state-success-title"]}
            </h1>
          </div>
        )}

        <p>{text}</p>
      </div>
      <p
        className="read-the-docs"
        dangerouslySetInnerHTML={{ __html: content["puzzle-info"] }}
      ></p>
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
