import { JSX, useEffect, useRef } from "react";
import ContentCard from "./content-card";

type Party = {
  name: string;
  symbol: string;
};

type PartyWithDistance = Party & { distance: number };

type PartyStyle = {
  [symbol: string]: { bg: string; text: string };
};

type ResultProps = {
  parties: Party[];
  partyStyles: PartyStyle;
  partyLinks: Record<string, string>;
  assertions: [string, string][];
  forAndAgainst: string[];
  opinions: number[][];
  userAnswers: number[];
};

export default function Result({
  parties,
  partyStyles,
  partyLinks,
  assertions,
  forAndAgainst,
  opinions,
  userAnswers,
}: ResultProps) {
  // Calculate distances
  const partiesWithDistance: PartyWithDistance[] = parties.map((party, i) => {
    const distance = opinions[i].reduce((sum, opinion, j) => {
      const userAnswer = userAnswers[j];
      if (typeof userAnswer !== "number") return sum; // skip unanswered
      return sum + Math.abs(opinion - userAnswer);
    }, 0);

    return { ...party, distance };
  });

  const sortedParties = partiesWithDistance
    .slice()
    .sort((a, b) => a.distance - b.distance);

  const answeredCount = userAnswers.filter((a) => typeof a === "number").length;
  const maxDistance = 4 * answeredCount;

  // Helper function to calculate percentage
  const getPercentage = (distance: number) =>
    Math.round(((maxDistance - distance) / maxDistance) * 100);

  const [topParty, ...remainingParties] = sortedParties;

  return (
    <div className="flex flex-col items-center gap-10 text-black">
      {/* Top party display */}
      <ContentCard>
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-regular text-xl">Du er mest enig med</h1>
          <div className="text-center">
            <div className="mb-1 text-3xl font-semibold">{topParty.name}</div>
            <div className="text-md font-regular mb-8">
              Dere er {getPercentage(topParty.distance)}% enige
            </div>
            <div className="flex justify-center">
              <a
                href={partyLinks[topParty.symbol]}
                target="_blank"
                rel="noopener noreferrer"
                className={"bg-[#ff6340] font-semibold font-xl text-white px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-4xl flex items-center justify-center gap-1"}
              >
                Besøk {topParty.name}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </ContentCard>

      {/* All parties vertical list */}
      <ContentCard>
        <div className="w-full max-w-2xl">
          <h2 className="text-lg font-semibold text-center">
            Andre partier
          </h2>
          <h2 className="text-sm font-regular mb-8 text-center">
            Enighet visualisert i prosent
          </h2>
          <div className="space-y-4">
            {remainingParties.map((party, index) => {
              const percentage = getPercentage(party.distance);
              return (
                <div key={index} className="flex items-center gap-4">
                  {/* Party symbol */}
                  <div className={`${partyStyles[party.symbol]?.bg || 'bg-gray-500'} ${partyStyles[party.symbol]?.text || 'text-white'} w-12 h-8 flex items-center justify-center rounded font-semibold text-sm flex-shrink-0`}>
                    {party.symbol}
                  </div>
                  
                  {/* Progress bar container */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{party.name}</span>
                      <span className="text-sm font-semibold">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${partyStyles[party.symbol]?.bg || 'bg-gray-500'} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ContentCard>

      {/* Try again button */}
      <div className="flex justify-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-[#ff6340] font-semibold font-xl text-white mb-5 px-5 py-2 w-fit cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-4xl flex items-center gap-1"
        >
          Nytt forsøk
        </button>
      </div>
    </div>
  );
}
