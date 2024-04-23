import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { getRestaurantStatus } from "@/store/restaurantSlice";
import { ICuisineCheckbox } from "@/types";

const CuisineCheckbox = ({ cuisine, field }: ICuisineCheckbox) => {
  const { loading } = useAppSelector(getRestaurantStatus);

  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          disabled={loading}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
