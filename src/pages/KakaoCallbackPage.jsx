import { useEffect } from "react";

const KakaoCallbackPage = () => {
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        console.log("💡 인가코드:", code);
    }, []);

    return <div>카카오 로그인 중입니다...</div>;
};

export default KakaoCallbackPage;
