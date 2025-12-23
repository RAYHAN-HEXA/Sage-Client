import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosInstance = useAxiosSecure();
  const { user } = useAuth();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/users?email=${user.email}`).then((res) => {
      setRole(res.data[0]?.role);
    });
  }, [user?.email, axiosInstance]);

  return role;
};

export default useRole;
