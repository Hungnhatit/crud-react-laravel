/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />
  }
  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  )
}