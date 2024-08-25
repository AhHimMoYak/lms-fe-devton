import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../styles/AuthSection.css"
import * as jose from "jose";

function decodeToken(token) {
  try {
    const claims = jose.decodeJwt(token);
    return claims;
  } catch (err) {
    console.error("토큰 디코딩 실패:", err.message);
    return null;
  }
}

function AuthSection() {
  const [authorization, setAuthorization] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setAuthorization(token);
      const claims = decodeToken(token);
      if (claims) {
        const extractedName = claims.sub;
        setUsername(extractedName);
      }
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuthorization(null);
    setUsername("");
  };

  const handleMyPage = () => {
    navigate("/myPage");
  };

  return authorization ? (
    <div className="AuthSection">
      <div>{`{ ${username} } 님 반갑습니다.`}</div>
      <Button color="inherit" onClick={handleMyPage}>
        마이 페이지
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <div className="AuthSection">
      <Button color="inherit" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}

export default AuthSection;
