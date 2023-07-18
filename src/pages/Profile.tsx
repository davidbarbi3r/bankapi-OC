/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import UserHeader from "../components/UserHeader";
import { useGetProfileQuery } from "../store/api/userApiSlice";
import { useAppSelector } from "../store/hooks";

export default function Profile() {
  const user = useAppSelector((state) => state.user);
  const {data} = useGetProfileQuery(user.token);
  console.log(user, data);

  return (
    <main>
      <UserHeader userName="Tony Jarvis" />
      <section className="account">
        {}
      </section>
    </main>
  );
}
