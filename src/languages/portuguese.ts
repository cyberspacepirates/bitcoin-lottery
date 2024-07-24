export default {
  title: "Loteria do Bitcoin",
  "roll-btn": "Tentar a sorte",
  "puzzle-state-initial": "Te desejo boa sorte!",
  "puzzle-state-not-found": (start: string) =>
    `Eita! A chave não foi encontrada :/ começo = ${start}. Continue tentando!`,
  "puzzle-state-success-title": "ACHOU A CHAAVE!!!!",
  "puzzle-state-sucess-content": (keyHex: string, wif: string) =>
    `Voce encontrou a chave privada: ${keyHex}, aqui ta a WIF: ${wif}`,
  "puzzle-info":
    'Isso é uma loteria para resolver o puzzle desse endereço: <strong>13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so</strong><br></br> Nesse endereço tem 6.6 BTC, a cada tentativa voce testa 50 mil chaves. As possibilidades são de 36,893,488,147,419,103,231 chaves. <strong><br /> Leitura obrigatória: <a href="/bitcoin-lottery/education-pt.html"> Kangaroos! E o que fazer se eu achar?</a></strong>',
};
