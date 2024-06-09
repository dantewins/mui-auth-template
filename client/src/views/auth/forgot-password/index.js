import AuthLayout from "../AuthLayout";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
    return <AuthLayout title="Forgot Password" child={<ForgotPasswordForm />} />
};

export default ForgotPassword;