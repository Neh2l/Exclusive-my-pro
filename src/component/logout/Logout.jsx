import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Logout.css";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://backend-gules-six-47.vercel.app/api/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, logout!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Logged out!",
              text: "You have been successfully logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });

            localStorage.removeItem("token");

            setTimeout(() => {
              navigate("/login");
            }, 1500);
          }
        });
      } else {
        const errorData = await res.json();
        toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
        console.error("Logout failed:", errorData);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout.");
      navigate("/login");
    }
  };

  return (
    <>
      <FaSignOutAlt
        size={20}
        onClick={handleLogout}
        className="logout-icon"
        style={{ cursor: "pointer" }}
        title="Logout"
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Logout;
