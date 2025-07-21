"use client";
import Valgomat from "@/components/valgomat";
import ContentCard from "@/components/content-card";
import { useState } from "react";
import Result from "@/components/result";

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

const subjects = [
  "Skolehverdagen",
  "Eksamen",
  "Læreplasser",
  "Privatskole",
  "Skolehelsetjeneste",
  "Skolebygg",
];

const assertions: [string, string][] = [
  [
    "Skolene bør få større frihet til å velge læremidler og undervisningsopplegg.",
    subjects[0],
  ],
  [
    "Det bør innføres obligatorisk eksamen i praktisk-estetiske fag på ungdomsskolen.",
    subjects[1],
  ],
  [
    "Lærlinger bør få høyere lønn under læretiden for å sikre rekruttering til yrkesfag.",
    subjects[2],
  ],
  ["Mobiltelefoner bør forbys fullstendig i skoletiden.", subjects[0]],
  ["Eksamen bør fjernes helt til fordel for underveisvurdering.", subjects[1]],
  [
    "Flere læreplasser bør opprettes i det offentlige, særlig i helse- og omsorgssektoren.",
    subjects[2],
  ],
  [
    "Privatskoler bør få mindre offentlig støtte for å styrke fellesskolen.",
    subjects[3],
  ],
  [
    "Det bør ansettes flere helsesykepleiere i skolene for å sikre elevenes psykiske helse.",
    subjects[4],
  ],
  [
    "Det bør settes av statlige midler til omfattende oppgradering av skolebygg.",
    subjects[5],
  ],
  ["Religiøse privatskoler bør ikke ha adgang til statsstøtte.", subjects[3]],
  [
    "Skolehelsetjenesten bør være til stede hver dag på alle grunnskoler.",
    subjects[4],
  ],
  [
    "Skolebygg som ikke tilfredsstiller helsekrav, bør stenges til de er utbedret.",
    subjects[5],
  ],
];

const forAndAgainst = [
  `Noen mener at større lokal frihet til valg av læremidler gir mer fleksibel og relevant undervisning tilpasset elevenes behov. Det gir lærerne mulighet til å bruke oppdaterte ressurser og nye metoder.
  Andre frykter at det kan føre til større ulikhet i kvaliteten på undervisningen mellom skoler og kommuner, og at sentrale krav og mål lettere oversees.`,

  `Flere ønsker at praktisk-estetiske fag som musikk, kunst og kroppsøving skal anerkjennes mer gjennom vurdering på lik linje med andre fag.
  Kritikere mener at slike fag ikke egner seg for eksamen, og at det kan føre til økt stress og svekket glede ved praktisk læring.`,

  `Tilhengere av høyere lærlinglønn peker på at det kan gjøre yrkesfag mer attraktivt og gi bedre økonomiske vilkår for unge i lære. Mange har utgifter og må forsørge seg selv.
  Andre hevder at økt lærlinglønn kan gjøre det dyrere for bedriftene og føre til færre læreplasser, særlig i små virksomheter.`,

  `Noen mener mobilforbud i skoletiden bidrar til mer konsentrasjon, bedre læring og færre konflikter. Flere skoler har allerede gode erfaringer med forbud.
  Motstandere mener elevene heller bør lære å bruke teknologien ansvarlig, og at et forbud kan være vanskelig å håndheve i praksis.`,

  `Motstandere av eksamen mener at underveisvurdering gir et mer helhetlig og rettferdig bilde av elevens kompetanse. Eksamen kan oppleves som stressende og lite representativ for det eleven kan.
  Tilhengere mener eksamen gir en objektiv sluttvurdering og er nødvendig for å sammenligne nivå på tvers av skoler og elever.`,

  `Mange peker på behovet for flere læreplasser i helse og omsorg, spesielt med eldrebølgen. Det offentlige bør ta et større ansvar og gå foran som arbeidsgiver.
  Andre hevder det er kostbart og krever flere veiledere, og at det ikke er mulig å garantere kvalitet på opplæringen uten nok ressurser.`,

  `Tilhengere mener offentlig støtte til privatskoler svekker den offentlige fellesskolen, og at midlene heller burde gå til å forbedre det offentlige skoletilbudet. 
  Motstandere mener privatskoler gir foreldre og elever et viktig alternativ, og at mangfoldet i skoletilbudet bør bevares.`,

  `Mange elever sliter psykisk, og skolehelsetjenesten er ofte underbemannet. Flere mener det bør ansettes flere helsesykepleiere for å tilby samtaler, støtte og tidlig innsats.
  Kritikere peker på at det er vanskelig å rekruttere nok fagfolk og at det vil koste mye, særlig i små kommuner.`,

  `I mange kommuner er skolebygg i dårlig forfatning med fukt, dårlig ventilasjon og manglende vedlikehold. Flere mener staten må ta et større ansvar og bevilge midler til opprusting.
  Andre hevder at skolebygg er kommunens ansvar, og at staten ikke kan dekke alle lokale investeringer.`,

  `Motstandere av statsstøtte til religiøse skoler mener dette bryter med prinsippet om at offentlig støtte ikke skal gå til religiøs påvirkning. De ønsker å skille skole og religion tydeligere.
  Tilhengere mener at religionsfriheten innebærer retten til å velge en skole i tråd med eget livssyn – også med støtte fra staten, så lenge skolen følger læreplanen.`,

  `Flere organisasjoner mener skolehelsetjenesten må være til stede hver dag på alle grunnskoler for å oppdage og følge opp elevers helseproblemer tidlig.
  Motstandere peker på at det er vanskelig å oppnå med dagens ressursnivå, og at det er mer realistisk å styrke tjenesten gradvis der behovet er størst.`,

  `Mange mener at skolebygg som ikke er helsemessig forsvarlige bør stenges, for å beskytte elever og ansatte. Å fortsette undervisning i slike bygg svekker tilliten til skolen.
  Andre mener at midlertidige løsninger som brakkerigger og trinnvis utbedring er mer realistisk enn full stengning, som kan skape kaos for elever og foreldre.`,
];

const opinions = [
  [2, -1, 1, 2, 2, 1, 1, 2, 1, 2, 2, 2], // R
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 2], // SV
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2], // AP
  [2, 1, 2, 1, 1, 2, -1, 1, 1, 1, 1, 2], // SP
  [2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2], // MDG
  [1, -1, 1, 2, 1, 2, -1, 2, 2, -1, 1, 2], // KRF
  [1, 1, 1, 1, 1, 2, 1, 1, 1, -1, 1, 1], // V
  [-1, -2, -1, 2, -2, 1, -2, -1, 1, -2, 1, 1], // H
  [-2, -2, -2, 2, -2, -1, -2, -2, -1, -2, -1, -2], // FRP
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
          <Result
            parties={parties}
            partyStyles={partyStyles}
            assertions={assertions}
            forAndAgainst={forAndAgainst}
            opinions={opinions}
            userAnswers={userAnswers}
          />
        )}

        <div className="w-full flex justify-center pt-10">
          <ContentCard className="mb-[100]">
            <h1 className="font-semibold text-xl text-black">
              Om valgomaten vår
            </h1>
            <p className="font-regular text-black">
              Dette er en valgomat utviklet av Elevorganisasjonen som er laget
              for å hjelpe deg å finne ut hvilke partier som passer best med
              dine meninger om utdanningspolitikk. Du vil bli presentert for
              påstander, og du kan velge hvor enig eller uenig du er med dem.
              Basert på dine svar vil valgomaten vise hvilke partier du er mest
              enig med.
            </p>
          </ContentCard>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
