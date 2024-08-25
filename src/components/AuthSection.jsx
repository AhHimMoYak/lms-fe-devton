import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
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
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
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
    setUsername("");
  };

  const handleMyPage = () => {
    navigate("/myPage");
  };

  return (
    <div className="AuthSection">
      {username ? (
        <div>
          {`{ ${username} } 님 반갑습니다.`}
          <Button color="inherit" onClick={handleMyPage}>
            마이 페이지
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default AuthSection;