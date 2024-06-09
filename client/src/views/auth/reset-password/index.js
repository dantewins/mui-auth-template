import AuthValidateLink from '../AuthValidateLink';
import AuthLayout from '../AuthLayout';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
    return (
        <AuthLayout
            title="Reset Password"
            child={<ResetPasswordForm />}
            validation={true}
            route="/auth/validateResetLink"
            alternative={<AuthValidateLink title="reset password" valid={false} />}
        />
    );
};

export default ResetPassword;
