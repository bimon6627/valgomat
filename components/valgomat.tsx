"use client";

import { useState } from "react";

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

let userAnswers = [];

function handleSubmit() {}

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
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(0);
  const [currentAssertment, setCurrentAssertment] = useState(0);

  function select(value: number) {
    if (currentSelectedAnswer !== value) {
      setCurrentSelectedAnswer(value);
    } else {
      setCurrentSelectedAnswer(0);
    }
  }

  function moveToAssertment(moveBy: number) {
    setCurrentAssertment(currentAssertment + moveBy);
  }

  function partyOpinions(opinion: number) {
    let items = [];
    for (let i = 0; i < partiesSymbol.length; i++) {
      if (opinions[i][currentAssertment] === opinion) {
        items.push(<li key={i}>{partiesSymbol[i]}</li>);
      }
    }
    return items;
  }

  return (
    <div className="flex flex-col items-center gap-15">
      <div className="mt-50 p-10 pb-5 w-9/10 md:w-[500px] h-fit bg-white rounded-2xl">
        <h3 className="text-[#0A466E]">{assertions[currentAssertment][1]}</h3>
        <h1 className="font-semibold text-xl">
          {assertions[currentAssertment][0]}
        </h1>

        {/* Show party symbols only if an answer is selected */}
        {currentSelectedAnswer !== 0 && (
          <div className="mt-5 grid grid-cols-4 gap-4 justify-items-center items-end">
            <div className="flex flex-col items-center gap-2">
              <ul>{partyOpinions(-2)}</ul>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ul>{partyOpinions(-1)}</ul>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ul>{partyOpinions(1)}</ul>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ul>{partyOpinions(2)}</ul>
            </div>
          </div>
        )}

        {/* Align buttons in same grid format */}
        <form className="flex flex-col gap-2 items-center">
          <div className="mt-5 grid grid-cols-4 gap-4 justify-items-center">
            <button
              className={`px-1 rounded cursor-pointer text-[#f5f3ee] ${
                currentSelectedAnswer === -2
                  ? "bg-[#0A466E]"
                  : "bg-[#85A2B7] hover:bg-[#0A466E]"
              }`}
              type="button"
              onClick={() => select(-2)}
            >
              HELT UENIG
            </button>

            <button
              className={`px-1 rounded cursor-pointer text-[#3d3d3d] ${
                currentSelectedAnswer === -1
                  ? "bg-[#73FFD7]"
                  : "bg-[#B9FFEB] hover:bg-[#73FFD7]"
              }`}
              type="button"
              onClick={() => select(-1)}
            >
              LITT UENIG
            </button>

            <button
              className={`px-1 rounded cursor-pointer text-[#3d3d3d] ${
                currentSelectedAnswer === 1
                  ? "bg-[#FFDE66]"
                  : "bg-[#FFEEB2] hover:bg-[#FFDE66]"
              }`}
              type="button"
              onClick={() => select(1)}
            >
              LITT ENIG
            </button>

            <button
              className={`px-1 rounded cursor-pointer text-[#f5f3ee] ${
                currentSelectedAnswer === 2
                  ? "bg-[#FF6340]"
                  : "bg-[#FFB19F] hover:bg-[#FF6340]"
              }`}
              type="button"
              onClick={() => select(2)}
            >
              HELT ENIG
            </button>
          </div>

          <button className="bg-[#3d3d3d] text-[#f5f3ee] mt-4 px-3 py-1 w-fit cursor-pointer hover:bg-[#000000]">
            {currentSelectedAnswer === 0 ? "Hopp over" : "Neste påstand"}
          </button>
        </form>
      </div>

      <div className="p-10 w-9/10 md:w-[500px] h-fit bg-white rounded-2xl">
        <h1 className="font-semibold text-xl">Argumenter for og imot</h1>
        {splitParagraphs(forAndAgainst[currentAssertment])}
      </div>

      <div className="p-10 w-9/10 md:w-[500px] h-fit bg-white rounded-2xl">
        <h1 className="font-semibold text-xl">Om valgomaten vår</h1>
        <p>Det e en valgomat ka trenger du å vite..?</p>
      </div>
    </div>
  );
}
