import { Separator } from "@/components/ui/separator";

export function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-white px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
}
