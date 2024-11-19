import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function BasicFrame() {
    const location = useLocation();

    // 특정 경로에서 Footer를 숨기기 (정규식으로 경로 확인)
    const hideFooter = /^\/live\/[^/]+$/.test(location.pathname);

    return (
        <>
            <Header />
            <Outlet />
            {!hideFooter && <Footer />}
        </>
    );
}

export default BasicFrame;
