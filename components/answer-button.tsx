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
          w-12 h-12 rounded-full border-2
          flex items-center justify-center
          transition-all duration-300 ease-out
          relative group overflow-hidden
          ${selected ? "bg-[#ff6340] border-[#ff6340]" : "bg-white border-[#ff6340]"}
          hover:scale-105 active:scale-95
        `}
      >
        {/* Background fill animation */}
        <span
          className={`
            absolute inset-0 rounded-full
            transition-transform duration-300 ease-out
            pointer-events-none
            bg-[#ff6340]
            ${selected ? "scale-100" : "scale-0"}
          `}
        />
        {/* Hover effect */}
        <span
          className={`
            absolute inset-1 rounded-full
            transition-all duration-200 ease-out
            pointer-events-none
            ${selected ? "bg-transparent" : "group-hover:bg-[#ffe0d9]"}
          `}
        />
      </button>
      <span className="mt-2 font-regular text-center text-xs text-black">
        {label}
      </span>
    </div>
  );
}
