import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getAuthObj, signup } from "@/store/authSlice";

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
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import LoadingButton from "../../shared/LoadingButton";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(getAuthObj);

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
                  <Input placeholder="password" {...field} disabled={loading} />
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
              Sign up
            </Button>
          )}
          <Link to="/login">Already have an account? Login</Link>
        </form>
      </Form>
    </>
  );
};

export default Signup;
