import {
  Avatar as AvatarUI,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Avatar = ({ src, fallback }: { src?: string; fallback: string }) => {
  return (
    <AvatarUI>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-amber-100">{fallback}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
