import Login from "@/components/auth/login";
import { AuthLayout } from "@/components/layouts/auth-layout";

const LoginRoute = () => {

    return (
        <AuthLayout>
            <Login />
        </AuthLayout>
    );
}

export default LoginRoute;