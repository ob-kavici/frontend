import Navbar from "@/components/utils/navbar";
import { paths } from "@/config/paths";

interface LayoutProps {
    children: React.ReactNode;
}

export const AppLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar title="ob-kavici" linkTo={paths.home.getHref()} />
            {children}
        </>
    );
};