import { FormControl, FormItem, FormLabel, Checkbox } from "@/components";
import { ICuisineCheckbox } from "@/types";

const CuisineCheckbox = ({ cuisine, field }: ICuisineCheckbox) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
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
      <FormLabel className="text-sm font-normal capitalize">
        {cuisine}
      </FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
