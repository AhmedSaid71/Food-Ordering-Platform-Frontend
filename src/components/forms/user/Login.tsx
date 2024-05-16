import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/services";
import { Eye, EyeOff } from "lucide-react";
import { getAuthStatus } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LoginCredentialsValidator, TLoginCredentialsValidator } from "@/types";

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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { loading } = useAppSelector(getAuthStatus);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TLoginCredentialsValidator>({
    mode: "onBlur",
    resolver: zodResolver(LoginCredentialsValidator),
  });

  useEffect(() => {
    if (state && state.from) {
      toast("You have to login first ", {
        icon: "⚠️",
      });
    }
  }, [state]);

  const onSubmit = (data: TLoginCredentialsValidator) => {
    dispatch(login(data))
      .unwrap()
      .then((message) => {
        toast.success(message);
        if (state && state.from) {
          navigate(state.from);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 max-w-[540px] w-full"
      >
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

        {loading ? (
          <LoadingButton title="Submitting" />
        ) : (
          <Button
            type="submit"
            className="flex gap-4 bg-orange-600 rounded-sm text-white py-2 justify-center items-center mb-4 max-w-fit"
          >
            Login
          </Button>
        )}
        <Link to="/register">
          Don't have an account?{" "}
          <span className=" underline text-orange-500">Signup</span>
        </Link>
      </form>
    </Form>
  );
};

export default Login;
