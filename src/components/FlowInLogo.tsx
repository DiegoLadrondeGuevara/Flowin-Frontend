export default function FlowInLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src="/src/assets/FlowInLogo.svg" 
        alt="FlowIn Logo"
        className="h-12 md:h-16 object-contain"
      />
    </div>
  );
}