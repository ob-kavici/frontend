import Navbar from "@/components/utils/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export const AppLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};