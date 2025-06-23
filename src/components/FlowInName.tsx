export default function FlowInName({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="/src/assets/FlowInName.svg"
        alt="FlowIn Name"
        className="h-12 md:h-16 object-contain"
      />
    </div>
  );
}
