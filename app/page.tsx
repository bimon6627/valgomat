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

const subjects = ["Skolehverdagen", "Eksamen", "Læreplasser"];

const assertions: [string, string][] = [
  [
    "Elever ved alle skoletrinn bør ha lengre skoledager for å få mer tid til læring.",
    subjects[0],
  ],
  ["Det trengs flere kommunesammenslåinger her i landet.", subjects[1]],
  [
    "Flyktninger må bo andre steder enn i områder med mange innvandrere fra før.",
    subjects[2],
  ],
];

const forAndAgainst = [
  `Over de siste tiårene har politkerne lagt til flere år på skolen gjennom flere trinn og skoletimer. Enkelte mener at det er viktig å ha lengre skoledager for å gi elevene mer tid til læring, mens andre mener at det kan bli for mye press på elevene.
  Samtidig viser statistikk at flere skoletimer ikke har bidratt til å øke resultatene i skolen da resultatene i flere fag er blitt dårligere.
  Elevorganisasjonen mener det ikke er hensiktsmessig å legge til flere timer i skolen da dette kan føre til økt stress og press på elevene. Vi frykter dette vil bidra til mer utbrenthet, noe som ytterligere vil forværre resultatene i skolen.`,
  `Norge har 357 kommuner. Tallet ble redusert med om lag 70 da Erna Solbergs regjering gjennomførte en kommunereform.
  Tanken var at større kommuner er mer effektive, og at det er positivt for innbyggere og ansatte med større fagmiljøer. Mange mener det fortsatt er behov for å redusere tallet.
  En ulempe med sammenslåinger kan være at kommunene blir større geografiske områder med mer avstand mellom innbyggere og de som bestemmer, mener andre.`,
  `Flere store byer har nabolag der mange med innvandrerbakgrunn bor tett. Drammen og flere av Østfold-byene for eksempel.
  Noen foreslår å bosette flyktninger andre steder og å lage regler som sørger for at flyktninger ikke flytter videre til slike områder. De mener spredning gir bedre integrering og mindre utenforskap.
  De som er uenige, mener det er viktigst at folk har frihet til å bo der de vil, og der de har nettverk og trygghet.`,
];

const opinions = [
  [-2, -2, -1], // R
  [1, -2, -1], // SV
  [-1, -1, 2], // AP
  [-1, -2, 2], // SP
  [-2, -1, -1], // MDG
  [-1, -1, -1], // KRF
  [-1, 2, 1], // V
  [2, 2, 2], // H
  [-1, 2, 2], // FRP
];

export default function Home() {
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <main className="bg-[#ffefec] pt-10 w-screen h-full min-h-screen">
        <div className="w-full flex justify-center mt-8 mb-12">
          <div className="flex flex-col items-center">
            <img
              src="/eo-nasjonalt.svg"
              alt="Globe"
              className="w-[250px] h-auto"
            />
          </div>
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
            <p className="font-regular text-black">
              Dette er en valgomat utviklet av Elevorganisasjonen som er laget for å hjelpe deg å finne ut hvilke partier som passer best med dine meninger om utdanningspolitikk. Du vil bli presentert for påstander, og du kan velge hvor enig eller uenig du er med dem.
              Basert på dine svar vil valgomaten vise hvilke partier du er mest enig med.
            </p>
          </ContentCard>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
