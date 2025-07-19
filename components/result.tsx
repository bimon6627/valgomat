import { JSX } from "react";
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
  assertions: [string, string][];
  forAndAgainst: string[];
  opinions: number[][];
  userAnswers: number[];
};

export default function Result({
  parties,
  partyStyles,
  assertions,
  forAndAgainst,
  opinions,
  userAnswers,
}: ResultProps) {
  const distances: number[] = [];
  for (let i = 0; i < opinions.length; i++) {
    distances[i] = 0;
    for (let j = 0; j < userAnswers.length; j++) {
      distances[i] += Math.abs(opinions[i][j] - userAnswers[j]);
    }
  }
  const partiesWithDistance: PartyWithDistance[] = parties.map((party, i) => ({
    ...party,
    distance: distances[i],
  }));

  const sortedParties = partiesWithDistance
    .slice()
    .sort((a, b) => a.distance - b.distance);

  const maxDistance = 4 * assertions.length;

  return (
    <div className="flex flex-col items-center gap-10">
      <ContentCard>
        <h1 className="font-semibold text-xl text-black">
          Du er mest enig med
        </h1>
        <ol>
          {sortedParties.map((party, index) => (
            <li key={index}>
              {party.symbol},{" "}
              {Math.round(((maxDistance - party.distance) / maxDistance) * 100)}
              %
            </li>
          ))}
        </ol>
      </ContentCard>
    </div>
  );
}
