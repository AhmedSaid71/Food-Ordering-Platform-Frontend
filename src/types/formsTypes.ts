import { z } from "zod";

//Signup
export const SignupCredentialsValidator = z
  .object({
    name: z.string().min(8, "Name must be at least 8 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("This filed must be in email format you@example.com"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine(
    (obj) => obj.password === obj.passwordConfirm,
    "Password and Confirm Password are not the same!"
  );

export type TSignupCredentialsValidator = z.infer<
  typeof SignupCredentialsValidator
>;

//Login
export const LoginCredentialsValidator = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This filed must be in email format you@example.com"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginCredentialsValidator = z.infer<
  typeof LoginCredentialsValidator
>;

//Update Profile

export const UpdateProfileValidator = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().optional(),
  addressLine1: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
});

export type TUpdateProfileValidator = z.infer<typeof UpdateProfileValidator>;

//restaurant
export const MangeRestaurantValidator = z
  .object({
    name: z.string({
      required_error: "name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

export type TMangeRestaurantValidator = z.infer<
  typeof MangeRestaurantValidator
>;

export const SearchBarValidator = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type TSearchBarValidator = z.infer<typeof SearchBarValidator>;
