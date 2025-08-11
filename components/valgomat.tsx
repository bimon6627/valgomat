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
  userAnswers: (number | undefined)[];
  setUserAnswers: React.Dispatch<React.SetStateAction<(number | undefined)[]>>;
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

  // Calculate total number of answered questions
  const answeredCount = userAnswers.filter(
    (answer) => answer !== undefined
  ).length;

  // Calculate number of skips based on current position vs answers given
  const skipCount = currentAssertion + 1 - answeredCount;

  const select = (value: number) => {
    const newValue = currentSelectedAnswer !== value ? value : 0;
    setCurrentSelectedAnswer(newValue);
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      // If newValue is 0, it means the user is removing their answer
      updatedAnswers[currentAssertion] = newValue === 0 ? undefined : newValue;
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
      const nextAnswer = userAnswers[currentAssertion + 1];
      if (nextAnswer === undefined) {
        setCurrentSelectedAnswer(0);
      } else {
        setCurrentSelectedAnswer(nextAnswer);
      }
    } else {
      onSubmit();
    }
  }

  function previousAssertion() {
    if (currentAssertion > 0) {
      setCurrentAssertion(currentAssertion - 1);
      const prevAnswer = userAnswers[currentAssertion - 1];
      if (prevAnswer === undefined) {
        setCurrentSelectedAnswer(0);
      } else {
        setCurrentSelectedAnswer(prevAnswer);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <ContentCard>
        <h3 className="font-regular text-[#0a466e]">
          {assertions[currentAssertion][1]}
        </h3>
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
                  ? "hidden"
                  : "bg-[#ff6340] font-semibold text-white mt-10 px-5 py-2 w-fit cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-4xl flex items-center gap-1"
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tilbake
            </button>
            <button
              type="button"
              onClick={() => nextAssertion()}
              disabled={currentSelectedAnswer === 0 && skipCount >= 11}
              className={
                currentSelectedAnswer === 0 && skipCount >= 11
                  ? "bg-gray-400 font-semibold text-gray-600 mt-10 px-5 py-2 w-fit cursor-not-allowed rounded-4xl flex items-center gap-1"
                  : "bg-[#ff6340] font-semibold text-white mt-10 px-5 py-2 w-fit cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-4xl flex items-center gap-1"
              }
            >
              {currentSelectedAnswer === 0 ? (
                skipCount >= 11 ? (
                  "Kan ikke hoppe over"
                ) : (
                  "Hopp over"
                )
              ) : (
                <>
                  Neste påstand
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 mb-6 border-t border-gray-200"> </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-regular text-black">
              Spørsmål {currentAssertion + 1} av {assertions.length}
            </span>
            <span className="text-sm font-regular text-black">
              {Math.round((currentAssertion / assertions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#ff6340] h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${(currentAssertion / assertions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Answer counter - DEBUG */}
        {/* 
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            Antall svar gitt: <span className="font-semibold">{answeredCount}</span>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Antall ubesvarte spørsmål: <span className="font-semibold">{skipCount}</span>
          </div>
        </div>
        */}
      </ContentCard>

      <ContentCard>
        <h1 className="font-semibold text-xl text-black">
          Argumenter for og imot
        </h1>
        <div className="flex flex-col font-regular text-black mt-5">
          {splitParagraphs(forAndAgainst[currentAssertion])}
        </div>
      </ContentCard>
    </div>
  );
}
