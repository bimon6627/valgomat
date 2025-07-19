"use client";
import Valgomat from "@/components/valgomat";
import ContentCard from "@/components/content-card";
import { useState } from "react";

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

const assertions: [string, string][] = [
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
  [-2, -1, 2], // AP
  [-1, -2, 2], // SP
  [1, -1, -1], // MDG
  [2, -1, -1], // KRF
  [2, 2, 1], // V
  [2, 2, 2], // H
  [2, 2, 2], // FRP
];

export default function Home() {
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <main className="bg-[#ffefec] pt-10 w-screen h-full">
        <div className="w-full flex justify-center mt-8 mb-2">
          <img
            src="/eo-nasjonalt.svg"
            alt="Globe"
            className="w-[250px] h-auto"
          />
        </div>

        {!submitted ? (
          <Valgomat
            parties={parties}
            partyStyles={partyStyles}
            assertions={assertions}
            forAndAgainst={forAndAgainst}
            opinions={opinions}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            onSubmit={() => setSubmitted(true)}
          />
        ) : (
          <></>
        )}

        <div className="w-full flex justify-center pt-10">
          <ContentCard className="mb-[100]">
            <h1 className="font-semibold text-xl text-black">
              Om valgomaten vår
            </h1>
            <p className="text-black">
              Det e en valgomat ka trenger du å vite..?
            </p>
          </ContentCard>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
