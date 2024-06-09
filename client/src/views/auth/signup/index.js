import AuthLayout from "../AuthLayout";
import SignupForm from "./SignupForm";

const Signup = () => {
    return <AuthLayout title="Signup" child={<SignupForm />} />
};

export default Signup;