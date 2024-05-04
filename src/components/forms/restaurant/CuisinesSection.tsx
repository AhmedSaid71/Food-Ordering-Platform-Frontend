import { useFormContext } from "react-hook-form";
import { cuisineList } from "@/constants";
import {
  CuisineCheckbox,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem, i) => (
                <CuisineCheckbox
                  cuisine={cuisineItem}
                  field={field}
                  key={`${cuisineItem}-${i}`}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
