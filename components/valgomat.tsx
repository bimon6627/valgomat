let subjects = ["Næringsliv", "Distriktspolitikk", "Integrering"];

let assertions = [
  [
    "Skatte- og avgiftsnivået for norske bedrifter er altfor høyt.",
    subjects[0],
  ],
  ["Det trengs flere kommunesammenslåinger her i landet.", subjects[1]],
  [
    "Flyktninger må bo andre steder enn i områder med mange innvandrere fra før.",
    subjects[2],
  ],
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
let opinions = [
  [-2, -2, -1], //R
  [-2, -2, -1], //SV
  [-2, -1, 2], //AP
  [1, -2, 2], //SP
  [-1, -1, -1], //MDG
  [2, -1, -1], //KRF
  [2, 2, 1], //V
  [2, 2, 2], //H
  [2, 2, 2], //FRP
];
let skips = 0;
let order = [0, 1, 2];
let currentAssertment = 0;

function splitParagraphs(text: string) {
  let splitText = text.split("\n");

  return (
    <div className="flex flex-col gap-5">
      {splitText.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function Valgomat() {
  return (
    <div className="flex flex-col items-center w-screen">
      <div className="mt-50 p-10 h-fit w-1/2 bg-white rounded-2xl">
        <h3 className="text-[#0A466E]">{assertions[currentAssertment][1]}</h3>
        <h1 className="font-semibold text-xl">
          {assertions[currentAssertment][0]}
        </h1>
        <form className="flex flex-row mt-5 justify-evenly">
          <button className="bg-[#85A2B7] text-[#f5f3ee] px-1 rounded cursor-pointer hover:bg-[#0A466E]">
            HELT UENIG
          </button>
          <button className="bg-[#B9FFEB] text-[#3d3d3d] px-1 rounded cursor-pointer hover:bg-[#73FFD7]">
            LITT UENIG
          </button>
          <button className="bg-[#FFEEB2] text-[#3d3d3d] px-1 rounded cursor-pointer hover:bg-[#FFDE66]">
            LITT ENIG
          </button>
          <button className="bg-[#FFB19F] text-[#f5f3ee] px-1 rounded cursor-pointer hover:bg-[#FF6340]">
            HELT ENIG
          </button>
        </form>
      </div>

      <div className="mt-20 p-10 h-fit w-1/2 bg-white rounded-2xl">
        <h1 className="font-semibold text-xl">Argumenter for og imot</h1>
        {splitParagraphs(forAndAgainst[currentAssertment])}
      </div>

      <div className="mt-20 p-10 h-fit w-1/2 bg-white rounded-2xl">
        <h1 className="font-semibold text-xl">Om valgomaten vår</h1>
        <p>Det e en valgomat ka trenger du å vite..?</p>
      </div>
    </div>
  );
}
