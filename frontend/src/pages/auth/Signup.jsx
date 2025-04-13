import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useState} from "react";
import {validateEmail} from "../../utils/helper.js";
import PasswordInput from "../../components/common/PasswordInput.jsx";
import {signupUser} from "../../services/auth.js";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || name.length < 20 || name.length > 60) {
            toast.error("Name must be between 20 and 60 characters.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!address || address.length > 400) {
            toast.error("Address must not exceed 400 characters.");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be 8–16 characters, include 1 uppercase and 1 special character.");
            return;
        }

        const toastId = toast.loading("Creating Account...");
        try {
            const userData = await signupUser(name, email, address, password);
            toast.dismiss(toastId);
            toast.success("Account created successfully!");
            navigate("/login");
        } catch (error) {
            toast.dismiss(toastId);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again");
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16">
            <div className="w-full sm:w-96 rounded-lg bg-white px-7 py-10 shadow-lg mb-8 sm:mb-0">
                <form onSubmit={handleSignUp}>
                    <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">Create Account</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full text-sm bg-teal-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                    >
                        Signup
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-teal-900 underline hover:text-blue-800">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}


export default Signup;