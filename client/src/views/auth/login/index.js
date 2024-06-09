import AuthLayout from "../AuthLayout";
import LoginForm from "./LoginForm";

const Login = () => {
    return <AuthLayout title="Login" child={<LoginForm />} />
};

export default Login;