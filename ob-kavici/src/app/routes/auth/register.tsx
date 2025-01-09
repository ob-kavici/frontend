import Register from "@/features/auth/register";
import { AuthLayout } from "@/components/layouts/auth-layout";

const RegisterRoute = () => {

    return (
        <AuthLayout>
            <Register />
        </AuthLayout>
    );
}

export default RegisterRoute;