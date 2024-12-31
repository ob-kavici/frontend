import Navbar from "../utils/navbar";
import { paths } from "@/config/paths";

interface LayoutProps {
    children: React.ReactNode;
}

export const GameLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar title="ob-kavici" linkTo={paths.games.root.getHref()} />
            {children}
        </> 
    );
};