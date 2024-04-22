import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import { createRestaurant, getRestaurantStatus } from "@/store/restaurantSlice";

import { MangeRestaurantValidator, TMangeRestaurantValidator } from "@/types";
import LoadingButton from "@/components/shared/LoadingButton";
import toast from "react-hot-toast";

const MangeRestaurant = () => {
  const { loading } = useAppSelector(getRestaurantStatus);

  const dispatch = useAppDispatch();
  const form = useForm<TMangeRestaurantValidator>({
    resolver: zodResolver(MangeRestaurantValidator),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: TMangeRestaurantValidator) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }
    dispatch(createRestaurant(formData))
      .unwrap()
      .then(() => {
        toast.success("Your restaurant has been created successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {loading ? (
          <LoadingButton title="submitting" />
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export default MangeRestaurant;
