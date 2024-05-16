import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { getAuthStatus } from "@/store";
import { signup } from "@/services";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  SignupCredentialsValidator,
  TSignupCredentialsValidator,
} from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  LoadingButton,
} from "@/components";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(getAuthStatus);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TSignupCredentialsValidator>({
    resolver: zodResolver(SignupCredentialsValidator),
  });

  const onSubmit = (data: TSignupCredentialsValidator) => {
    dispatch(signup(data))
      .unwrap()
      .then((message) => {
        toast.success(message);
        navigate("/login");
      })
      .catch((err) => toast.error(err));
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 max-w-[540px] w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className=" relative flex items-center">
                    <Input
                      placeholder="password"
                      {...field}
                      disabled={loading}
                      type={showPassword ? "text" : "password"}
                    />
                    {showPassword ? (
                      <EyeOff
                        className="absolute right-2 cursor-pointer text-slate-600"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 cursor-pointer text-slate-600"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    disabled={loading}
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loading ? (
            <LoadingButton title="Submitting" />
          ) : (
            <Button
              type="submit"
              className="flex gap-4 bg-orange-600 rounded-sm text-white py-2 justify-center items-center mb-4 max-w-fit"
            >
              Sign up
            </Button>
          )}
          <Link to="/login">
            Already have an account?{" "}
            <span className=" underline text-orange-500">Login</span>
          </Link>
        </form>
      </Form>
    </>
  );
};

export default Signup;
