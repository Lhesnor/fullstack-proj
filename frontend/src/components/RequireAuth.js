import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const token = useSelector((state) => state.token.value);
  return token ? children : <Navigate to="/login" replace />;
}
