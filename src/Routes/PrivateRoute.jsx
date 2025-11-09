import { useLocation, Navigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader2 } from "lucide-react";
import { auth } from "../firebase/firebase.config";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="animate-spin w-8 h-8 text-sky-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
