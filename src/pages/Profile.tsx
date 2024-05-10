import toast from "react-hot-toast";
import { ProfileForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateUser } from "@/services";
import { TUpdateProfileValidator } from "@/types";
import { getUserStatus } from "@/store";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(getUserStatus);

  const onSubmit = (data: TUpdateProfileValidator) => {
    dispatch(updateUser(data))
      .unwrap()
      .then(({ message }) => {
        toast.success(message);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <section>
      <ProfileForm onSubmit={onSubmit} loading={loading} />
    </section>
  );
};

export default Profile;
