/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import { useGetProfileQuery } from "../store/api/userApiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import Account from "../components/Account";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const {data, isError, isLoading} = useGetProfileQuery(user.token);
  const [username, setUsername] = useState(`${data?.firstName ? data.firstName : "Joe"} ${data?.lastName ? data.lastName : "Doe"}`);
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
      id: "x8367",
      amount: 184.30,
    },
  ]

  useEffect(() => {
      const userData = {
        ...user,
        firstName: user?.firstName ? user.firstName : data?.firstName,
        lastName: user?.lastName ? user.lastName : data?.lastName,
      };

      dispatch(setUser(userData));
      setUsername(() =>`${user?.firstName ? user.firstName : ""} ${user?.lastName ? user.lastName : ""}`);
  }, [user, dispatch, data]);

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
