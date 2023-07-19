/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import { useGetProfileQuery } from "../store/api/userApiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { useEffect } from "react";
import Account from "../components/Account";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const {data, isError, isLoading} = useGetProfileQuery(user.token);
  const username = `${user.firstName!} ${user.lastName!}`;
  const accounts = [
    {
      id: "x8349",
      amount: 2082.79,
    },
    {
      id: "x6712",
      amount: 10928.42,
    },
    {
      id: "x8349",
      amount: 184.30,
    },
  ]


  useEffect(() => {
    if (data) {
      const userData = {
        ...user,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
      };

      dispatch(setUser(userData));
    }
  }, [data, dispatch, user]);

  if (!user.token) navigate("/login")
  
  if (isLoading) return <div>Loading...</div>

  return (
    <main>
      <UserHeader userName={username} />
      <section className="accounts">
        {accounts.map((account) => (
          <Account accountNumber={account.id} amount={account.amount} transactions={[]} key={account.id} />
        ))
          }
      </section>
    </main>
  );
}
