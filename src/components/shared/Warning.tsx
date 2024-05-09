import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Button,
  DialogClose,
} from "@/components";
import { useAppDispatch } from "@/hooks";
import { IWarning } from "@/types";
import { cancelDiff, clearCart } from "@/store";

const Warning = ({ restaurantName, isOpen }: IWarning) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(clearCart());
  };
  const handleCloseClick = () => {
    dispatch(cancelDiff());
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className=" space-y-2">
        <DialogHeader>
          <DialogTitle className=" mb-2">Delete Cart Items</DialogTitle>
          <DialogDescription>
            There are another orders in the cart for {restaurantName} are you
            sure you want to remove them!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleClick}
            className="bg-orange-500 text-white hover:bg-orange-500 hover:text-white hover:opacity-70"
          >
            Delete
          </Button>
          <DialogClose onClick={handleCloseClick}>cancel</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Warning;
