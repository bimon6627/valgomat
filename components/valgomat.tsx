import { JSX, useState } from "react";
import AnswerButton from "./answer-button";
import ContentCard from "./content-card";

type Party = {
  name: string;
  symbol: string;
};

type PartyStyle = {
  [symbol: string]: { bg: string; text: string };
};

type ValgomatProps = {
  parties: Party[];
  partyStyles: PartyStyle;
  assertions: [string, string][];
  forAndAgainst: string[];
  opinions: number[][];
  userAnswers: number[];
  setUserAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  onSubmit: () => void;
};

const ANSWER_OPTIONS = [
  { value: -2, label: "HELT UENIG" },
  { value: -1, label: "LITT UENIG" },
  { value: 1, label: "LITT ENIG" },
  { value: 2, label: "HELT ENIG" },
] as const;

function splitParagraphs(text: string) {
  return text.split("\n").map((p, i) => <p key={i}>{p}</p>);
}

export default function Valgomat({
  parties,
  partyStyles,
  assertions,
  forAndAgainst,
  opinions,
  userAnswers,
  setUserAnswers,
  onSubmit,
}: ValgomatProps) {
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(0);
  const [currentAssertion, setCurrentAssertion] = useState(0);

  const select = (value: number) => {
    setCurrentSelectedAnswer((prev) => (prev !== value ? value : 0));
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentAssertion] = value;
      return updatedAnswers;
    });
  };

  const partyOpinions = (opinion: number): JSX.Element[] => {
    return parties
      .map((party, i) => {
        if (opinions[i][currentAssertion] !== opinion) return null;
        const style = partyStyles[party.symbol];
        return (
          <li key={party.symbol} className="pb-1">
            <span
              className={`inline-flex items-center justify-center w-14 h-8 py-[2px] rounded-full font-bold ${style.bg} ${style.text}`}
            >
              {party.symbol}
            </span>
          </li>
        );
      })
      .filter(Boolean) as JSX.Element[];
  };

  function nextAssertion() {
    if (currentAssertion < assertions.length - 1) {
      setCurrentAssertion(currentAssertion + 1);
      if (userAnswers[currentAssertion + 1] === undefined) {
        setCurrentSelectedAnswer(0);
      } else {
        setCurrentSelectedAnswer(userAnswers[currentAssertion + 1]);
      }
    } else {
      onSubmit();
    }
  }

  function previousAssertion() {
    if (currentAssertion > 0) {
      setCurrentAssertion(currentAssertion - 1);
      if (userAnswers[currentAssertion - 1] === undefined) {
        setCurrentSelectedAnswer(0);
      } else {
        setCurrentSelectedAnswer(userAnswers[currentAssertion - 1]);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <ContentCard>
        <h3 className="font-regular text-[#0a466e]">{assertions[currentAssertion][1]}</h3>
        <h1 className="font-semibold text-xl text-black">
          {assertions[currentAssertion][0]}
        </h1>

        <form className="flex flex-col gap-2 items-center">
          <div className="mt-5 grid grid-cols-4 gap-10 justify-items-center">
            {ANSWER_OPTIONS.map((opt) => (
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
          <div className="flex flex-row gap-5">
            <button
              type="button"
              onClick={() => previousAssertion()}
              className={
                currentAssertion === 0
                  ? `hidden`
                  : `bg-[#ff6340] font-semibold text-[#f5f3ee] mt-10 px-5 py-2 w-fit cursor-pointer hover:bg-[#000000] rounded`
              }
            >
              Tilbake
            </button>
            <button
              type="button"
              onClick={() => nextAssertion()}
              className="bg-[#ff6340] font-semibold text-[#f5f3ee] mt-10 px-5 py-2 w-fit cursor-pointer hover:bg-[#000000] rounded"
            >
              {currentSelectedAnswer === 0 ? "Hopp over" : "Neste påstand →"}
            </button>
          </div>
        </form>
      </ContentCard>

      <ContentCard>
        <h1 className="font-semibold text-xl text-black">
          Argumenter for og imot
        </h1>
        <div className="flex flex-col gap-5 font-regular text-black">
          {splitParagraphs(forAndAgainst[currentAssertion])}
        </div>
      </ContentCard>
    </div>
  );
}
