import { JSX } from "react";

const ANSWER_OPTIONS = [
  { value: -2, label: "HELT UENIG" },
  { value: -1, label: "LITT UENIG" },
  { value: 1, label: "LITT ENIG" },
  { value: 2, label: "HELT ENIG" },
] as const;

type AnswerButtonProps = {
  value: number;
  label: string;
  currentSelectedAnswer: number;
  select: (v: number) => void;
  partyOpinions: (v: number) => JSX.Element[];
};

export default function AnswerButton({
  value,
  label,
  currentSelectedAnswer,
  select,
  partyOpinions,
}: AnswerButtonProps) {
  const selected = currentSelectedAnswer === value;
  const hasSelection = currentSelectedAnswer !== 0;

  const maxStackHeight = hasSelection
    ? Math.max(...ANSWER_OPTIONS.map((opt) => partyOpinions(opt.value).length))
    : 0;

  return (
    <div className="flex flex-col items-center">
      <ul
        className="mb-2 min-h-[5px] flex flex-col items-center justify-end transition-all duration-300 overflow-hidden"
        style={{ height: hasSelection ? `${maxStackHeight * 2.5}rem` : "0" }}
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
