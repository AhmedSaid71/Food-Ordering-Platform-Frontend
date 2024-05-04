import { ILoadingButton } from "@/types";
import { Button } from "@/components";
import { Loader2 } from "lucide-react";

const LoadingButton = ({ title }: ILoadingButton) => {
  return (
    <Button
      disabled
      className="flex items-center gap-2 justify-center max-w-fit"
    >
      {title}
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </Button>
  );
};

export default LoadingButton;
