import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getAuthObj, login } from "@/store/authSlice";

import { LoginCredentialsValidator, TLoginCredentialsValidator } from "@/types";

import LoadingButton from "../../shared/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(getAuthObj);

  const form = useForm<TLoginCredentialsValidator>({
    mode: "onBlur",
    resolver: zodResolver(LoginCredentialsValidator),
  });

  const onSubmit = (data: TLoginCredentialsValidator) => {
    dispatch(login(data))
      .unwrap()
      .then((message) => {
        toast.success(message);
        navigate("/");
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
                <Input placeholder="password" {...field} disabled={loading} />
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
        <Link to="/register">Don't have an account? Signup</Link>
      </form>
    </Form>
  );
};

export default Login;
