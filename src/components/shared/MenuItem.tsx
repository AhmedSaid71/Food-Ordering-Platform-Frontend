import { IMenuItem, IMenuItemProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components";
import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/store";

const MenuItem = ({
  menuItem,
  restaurantId,
  restaurantName,
}: IMenuItemProps) => {
  const dispatch = useAppDispatch();

  const add = (menuItem: IMenuItem) => {
    dispatch(addToCart({ menuItem, restaurantId, restaurantName }));
  };

  return (
    <Card className="cursor-pointer" onClick={() => add(menuItem)}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        £{(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
