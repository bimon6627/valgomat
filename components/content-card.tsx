export default function ContentCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-10 w-9/10 md:w-[500px] h-fit bg-white rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
