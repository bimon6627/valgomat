"use client";

import { JSX, useState } from "react";

const parties = [
  { name: "Rødt", symbol: "R" },
  { name: "Sosialistisk Venstreparti", symbol: "SV" },
  { name: "Arbeiderpartiet", symbol: "AP" },
  { name: "Senterpartiet", symbol: "SP" },
  { name: "Miljøpartiet De Grønne", symbol: "MDG" },
  { name: "Kristelig Folkeparti", symbol: "KRF" },
  { name: "Venstre", symbol: "V" },
  { name: "Høyre", symbol: "H" },
  { name: "Fremskrittspartiet", symbol: "FRP" },
];

const partyStyles: Record<string, { bg: string; text: string }> = {
  R: { bg: "bg-red-800", text: "text-white" },
  SV: { bg: "bg-purple-600", text: "text-white" },
  AP: { bg: "bg-red-500", text: "text-white" },
  SP: { bg: "bg-green-500", text: "text-white" },
  MDG: { bg: "bg-green-900", text: "text-white" },
  FRP: { bg: "bg-blue-900", text: "text-white" },
  H: { bg: "bg-blue-300", text: "text-white" },
  V: { bg: "bg-cyan-600", text: "text-white" },
  KRF: { bg: "bg-yellow-400", text: "text-black" },
};

const subjects = ["Næringsliv", "Distriktspolitikk", "Integrering"];

const assertions = [
  ["Skatte- og avgiftsnivået for norske bedrifter er altfor høyt.", subjects[0]],
  ["Det trengs flere kommunesammenslåinger her i landet.", subjects[1]],
  ["Flyktninger må bo andre steder enn i områder med mange innvandrere fra før.", subjects[2]],
];

const forAndAgainst = [
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

const opinions = [
  [-2, -2, -1], // R
  [-2, -2, -1], // SV
  [-2, -1, 2],  // AP
  [-1, -2, 2],  // SP
  [1, -1, -1],  // MDG
  [2, -1, -1],  // KRF
  [2, 2, 1],    // V
  [2, 2, 2],    // H
  [2, 2, 2],    // FRP
];

const ANSWER_OPTIONS = [
  { value: -2, label: "HELT UENIG" },
  { value: -1, label: "LITT UENIG" },
  { value: 1, label: "LITT ENIG" },
  { value: 2, label: "HELT ENIG" },
] as const;

function splitParagraphs(text: string) {
  return text.split("\n").map((p, i) => <p key={i}>{p}</p>);
}

type AnswerButtonProps = {
  value: number;
  label: string;
  currentSelectedAnswer: number;
  select: (v: number) => void;
  partyOpinions: (v: number) => JSX.Element[];
};

function AnswerButton({
  value,
  label,
  currentSelectedAnswer,
  select,
  partyOpinions,
}: AnswerButtonProps) {
  const selected = currentSelectedAnswer === value;
  const hasSelection = currentSelectedAnswer !== 0;
  
  const maxStackHeight = hasSelection 
    ? Math.max(...ANSWER_OPTIONS.map(opt => partyOpinions(opt.value).length))
    : 0;
  
  return (
    <div className="flex flex-col items-center">
      <ul
        className="mb-2 min-h-[5px] flex flex-col items-center justify-end transition-all duration-300 overflow-hidden"
        style={{ height: hasSelection ? `${maxStackHeight * 2.5}rem` : '0' }}
      >
        {hasSelection && partyOpinions(value)}
      </ul>
      <button
        type="button"
        onClick={() => select(value)}
        className={`
          w-12 h-12 rounded-full border-2 border-gray-400
          flex items-center justify-center
          transition-all duration-150
          relative group
          ${selected ? "bg-black border-black" : "bg-white"}
        `}
      >
        <span
          className={`
            absolute inset-1 rounded-full
            transition-all duration-150
            pointer-events-none
            ${selected ? "bg-black" : "group-hover:bg-gray-300"}
          `}
        />
      </button>
      <span className="mt-2 text-center text-xs text-[#3d3d3d] font-medium">
        {label}
      </span>
    </div>
  );
}

function ContentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-10 w-9/10 md:w-[500px] h-fit bg-white rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export default function Valgomat() {
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(0);
  const [currentAssertment, setCurrentAssertment] = useState(0);

  const select = (value: number) => {
    setCurrentSelectedAnswer(prev => prev !== value ? value : 0);
  };

  const partyOpinions = (opinion: number): JSX.Element[] => {
    return parties
      .map((party, i) => {
        if (opinions[i][currentAssertment] !== opinion) return null;
        const style = partyStyles[party.symbol];
        return (
          <li key={party.symbol} className="pb-1">
            <span className={`inline-flex items-center justify-center w-14 h-8 py-[2px] rounded-full font-bold ${style.bg} ${style.text}`}>
              {party.symbol}
            </span>
          </li>
        );
      })
      .filter(Boolean) as JSX.Element[];
  };

  return (
    <div className="flex flex-col items-center gap-10 pt-10 bg-[#ffefec] min-h-screen">
      <div className="w-full flex justify-center mt-8 mb-2">
        <img src="/eo-nasjonalt.svg" alt="Globe" className="w-[250px] h-auto" />
      </div>
      
      <ContentCard>
        <h3 className="text-[#0A466E]">{assertions[currentAssertment][1]}</h3>
        <h1 className="font-semibold text-xl text-black">
          {assertions[currentAssertment][0]}
        </h1>
        <form className="flex flex-col gap-2 items-center">
          <div className="mt-5 grid grid-cols-4 gap-10 justify-items-center">
            {ANSWER_OPTIONS.map(opt => (
              <AnswerButton
                key={opt.value}
                value={opt.value}
                label={opt.label}
                currentSelectedAnswer={currentSelectedAnswer}
                select={select}
                partyOpinions={partyOpinions}
              />
            ))}
          </div>
          <button className="bg-[#ff6340] text-[#f5f3ee] mt-10 px-5 py-2 w-fit cursor-pointer hover:bg-[#000000]">
            {currentSelectedAnswer === 0 ? "Hopp over" : "Neste påstand"}
          </button>
        </form>
      </ContentCard>
      
      <ContentCard>
        <h1 className="font-semibold text-xl text-black">Argumenter for og imot</h1>
        <div className="flex flex-col gap-5 text-black">
          {splitParagraphs(forAndAgainst[currentAssertment])}
        </div>
      </ContentCard>
      
      <ContentCard className="mb-[100]">
        <h1 className="font-semibold text-xl text-black">Om valgomaten vår</h1>
        <p className="text-black">Det e en valgomat ka trenger du å vite..?</p>
      </ContentCard>
    </div>
  );
}
