import {
  Avatar as AvatarUI,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Avatar = ({
  src,
  fallback,
  className,
}: {
  src?: string;
  fallback: string;
  className?: string;
}) => {
  return (
    <AvatarUI className={className}>
      <AvatarImage src={src || "/images/placeholder-user.png"} />
      <AvatarFallback className="bg-amber-100">{fallback}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
