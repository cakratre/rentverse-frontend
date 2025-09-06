import Hero from "@/components/Hero";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyRole } from "@/utils/verifyRole";

const OwnerHomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        verifyRole(navigate, ["Owner"]);
    }, [navigate]);

    return (
        <div>
            <Hero />
        </div>
    )
}

export default OwnerHomePage;