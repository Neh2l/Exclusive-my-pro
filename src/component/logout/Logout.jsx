import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("No token found");
                navigate("/login");
                return;
            }

            const res = await fetch("https://backend-gules-six-47.vercel.app/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                localStorage.removeItem("token");
                alert("Logout successful ");
                navigate("/login");
            } else {
                const errorData = await res.json();
                console.error("Logout failed:", errorData);
                alert("Logout failed ");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong ");
        }
    };

    return (
        // <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt size={20} onClick={handleLogout} />

    );
};

export default Logout;