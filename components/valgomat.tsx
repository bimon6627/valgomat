let assertions = [
  "Skatte- og avgiftsnivået for norske bedrifter er altfor høyt.",
  "Det trengs flere kommunesammenslåinger her i landet.",
  "Flyktninger må bo andre steder enn i områder med mange innvandrere fra før.",
];
let forAndAgainst = [
  `Norske bedrifter må betale ulike skatter for å bidra til statskassa og samfunnet. Selskapsskatten er på 22 prosent. Det kan være særlige skatter for kraftbransjen eller fiskeoppdrettere, mens eiere kan få formuesskatt.

Debatten om skattetrykket har rast. Noen norske eiere har flyttet til Sveits. Skattetrykket må ned for å verne om norsk eierskap, mener noen.

Andre mener skattene ikke er urimelig høye, og at velferdssamfunnet gir mange andre goder for bedrifter i Norge.`,
  `Norge har 357 kommuner. Tallet ble redusert med om lag 70 da Erna Solbergs regjering gjennomførte en kommunereform.

Tanken var at større kommuner er mer effektive, og at det er positivt for innbyggere og ansatte med større fagmiljøer. Mange mener det fortsatt er behov for å redusere tallet.

En ulempe med sammenslåinger kan være at kommunene blir større geografiske områder med mer avstand mellom innbyggere og de som bestemmer, mener andre.`,
  `Flere store byer har nabolag der mange med innvandrerbakgrunn bor tett. Drammen og flere av Østfold-byene for eksempel.

Noen foreslår å bosette flyktninger andre steder og å lage regler som sørger for at flyktninger ikke flytter videre til slike områder. De mener spredning gir bedre integrering og mindre utenforskap.

De som er uenige, mener det er viktigst at folk har frihet til å bo der de vil, og der de har nettverk og trygghet.`,
];
let parties = [
  "Rødt",
  "Sosialistisk Venstreparti",
  "Arbeiderpartiet",
  "Senterpartiet",
  "Miljøpartiet De Grønne",
  "Kristelig Folkeparti",
  "Venstre",
  "Høyre",
  "Fremskrittspartiet",
];
let partiesSymbol = ["R", "SV", "AP", "SP", "MDG", "KRF", "V", "H", "FRP"];
let skips = 0;
let order = [0, 1, 2];
let currentAssertment = 0;
export default function Valgomat() {
  return (
    <div>
      <div>
        <h1>{assertions[currentAssertment]}</h1>
      </div>
    </div>
  );
}
