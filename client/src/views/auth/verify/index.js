import AuthValidateLink from '../AuthValidateLink';
import AuthLayout from '../AuthLayout';

const Verify = () => {
    return (
        <AuthLayout
            title="Verify Account"
            child={<AuthValidateLink title="verify account" valid={true} />}
            validation={true}
            route="/auth/verify"
            alternative={<AuthValidateLink title="verify account" valid={false} />}
        />
    );
};

export default Verify;
