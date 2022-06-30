import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { history } from "../utils";

export default function PrivateRoute({ children }) {
  const { user: authUser } = useSelector((x) => x.auth);

  if (!authUser) {
    return <Navigate to="/login" state={{ from: history.location }} />;
  }
  return children;
}
