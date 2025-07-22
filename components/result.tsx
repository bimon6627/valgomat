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
  // Calculate distances
  const partiesWithDistance: PartyWithDistance[] = parties.map((party, i) => ({
    ...party,
    distance: opinions[i].reduce(
      (sum, opinion, j) => sum + Math.abs(opinion - userAnswers[j]),
      0
    ),
  }));

  const sortedParties = partiesWithDistance
    .slice()
    .sort((a, b) => a.distance - b.distance);

  const maxDistance = 4 * assertions.length;

  // Helper function to calculate percentage
  const getPercentage = (distance: number) =>
    Math.round(((maxDistance - distance) / maxDistance) * 100);

  const [topParty, ...remainingParties] = sortedParties;

  // Ref for the horizontal scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Enable horizontal scrolling with mouse wheel on Windows
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault();
        scrollContainer.scrollBy({
          left: e.deltaY, // Less jumpy
          behavior: "smooth", // Smooth animation
        });
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // CSS class configurations
  const scrollbarHideClasses = [
    "[&::-webkit-scrollbar]:hidden",
    "[-ms-overflow-style:none]",
    "[scrollbar-width:none]",
  ].join(" ");

  const scrollSpacingClasses = [
    "before:w-2",
    "before:flex-shrink-0",
    "after:w-2",
    "after:flex-shrink-0",
    "min-[910px]:before:w-0",
    "min-[910px]:after:w-0",
  ].join(" ");

  const partyCardClasses = [
    "flex-shrink-0",
    "bg-white",
    "rounded-lg",
    "p-4",
    "min-w-[150px]",
    "text-center",
    "shadow-md",
  ].join(" ");

  return (
    <div className="flex flex-col items-center gap-10 text-black">
      {/* Top party display */}
      <ContentCard>
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-semibold text-xl">Du er mest enig med</h1>
          <div className="text-center">
            <div className="mb-1 text-2xl font-semibold">{topParty.name}</div>
            <div className="text-xl font-regular">
              {getPercentage(topParty.distance)}% Enig
            </div>
          </div>
        </div>
      </ContentCard>

      {/* Remaining parties horizontal scroll */}
      {remainingParties.length > 0 && (
        <div className="w-full max-w-4xl">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Andre partier
          </h2>
          <div
            ref={scrollContainerRef}
            className={`overflow-x-auto ${scrollbarHideClasses}`}
          >
            <div className={`flex gap-4 pb-4 ${scrollSpacingClasses}`}>
              {remainingParties.map((party, index) => (
                <div key={index + 1} className={partyCardClasses}>
                  <div className="font-semibold text-sm mb-1">{party.name}</div>
                  <div className="text-lg font-regular">
                    {getPercentage(party.distance)}% Enig
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
