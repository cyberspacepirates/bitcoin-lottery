export default {
  title: "Bitcoin Lottery",
  "roll-btn": "Roll a ticket",
  "puzzle-state-initial": "I wish you good luck!",
  "puzzle-state-not-found": (start: string) =>
    `Ssh :/ The key wasn't found, start = ${start}, Keep trying!`,
  "puzzle-state-success-title": "YOU FOUND THE KEEY!!!!",
  "puzzle-state-sucess-content": (keyHex: string, wif: string) =>
    `You found the key ${keyHex}, this is the WIF: ${wif}`,
  "puzzle-info":
    'This is a lottery to solve a puzzle of this address: <strong>13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so</strong><br></br> It contains 6.6 BTC, each time you roll you try 50K keys, the possibilities is 36,893,488,147,419,103,231 keys. <strong><br /> MUST READ: <a href="/bitcoin-lottery/education.html"> Kangaroos and What to do If I found it?</a></strong>',
};
