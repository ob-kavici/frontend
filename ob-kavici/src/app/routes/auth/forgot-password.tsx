import ForgotPassword from "@/components/auth/forgot-password";
import { AuthLayout } from "@/components/layouts/auth-layout";


const ForgotPasswordRoute = () => {
    return (
        <AuthLayout>
            <ForgotPassword />
        </AuthLayout>
    );
}

export default ForgotPasswordRoute;