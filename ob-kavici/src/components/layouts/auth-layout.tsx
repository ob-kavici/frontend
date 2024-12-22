import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Link to="/">
                <h1 className="text-5xl font-cursive text-primary mb-6 hover:text-amber-600">
                    ob-kavici
                </h1>
            </Link>
            {children}
            <Link to="/games">
                <Button variant="ghost" className="mt-4">
                    Igraj brez prijave
                </Button>
            </Link>
        </div>
    );
};