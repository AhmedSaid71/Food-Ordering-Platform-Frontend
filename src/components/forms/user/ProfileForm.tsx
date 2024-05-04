import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { getUser, getUserStatus } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateUser } from "@/services";
import {
  IUser,
  TUpdateProfileValidator,
  UpdateProfileValidator,
} from "@/types";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  LoadingButton,
  Input,
  Button,
} from "@/components";

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const { loading } = useAppSelector(getUserStatus);
  const form = useForm<TUpdateProfileValidator>({
    mode: "onBlur",
    resolver: zodResolver(UpdateProfileValidator),
    defaultValues: user as IUser,
  });

  const onSubmit = (data: TUpdateProfileValidator) => {
    dispatch(updateUser(data))
      .unwrap()
      .then(({ message }) => {
        toast.success(message);
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    form.reset(user as IUser);
  }, [user, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10 p-4"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <LoadingButton title="Updating" />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ProfileForm;
