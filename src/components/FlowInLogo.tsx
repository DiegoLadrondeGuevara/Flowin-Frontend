import flowInLogo from '../assets/FlowInLogo.svg';

export default function FlowInLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img
        src={flowInLogo} 
        alt="FlowIn Logo"
        className="h-12 md:h-16 object-contain"
      />
    </div>
  );
}