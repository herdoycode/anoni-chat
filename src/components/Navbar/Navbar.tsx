import { useContext, useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { LiaMoonSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { useThemeStore } from "../../store";
import "./Navbar.scss";

const Navbar = () => {
  const [navClass, setNavClass] = useState<string>("center");
  const [isCollapse, setCollapse] = useState<boolean>(true);

  const { user } = useContext(AuthContext);
  const mode = useThemeStore((store) => store.mode);
  const toggleTheme = useThemeStore((store) => store.toggleTheme);

  const handleNavToggle = () => {
    setCollapse(!isCollapse);
  };

  useEffect(() => {
    setNavClass(isCollapse ? "center" : "center active");
  }, [isCollapse]);

  return (
    <>
      <div className="navbar">
        <div className="left">
          <div onClick={handleNavToggle} className="toggler">
            {isCollapse ? (
              <FiMenu className="icon" />
            ) : (
              <MdClose className="icon" />
            )}
          </div>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className={navClass}>
          <ul>
            {!user && (
              <>
                <li>
                  <Link onClick={handleNavToggle} className="link" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link onClick={handleNavToggle} className="link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    handleNavToggle;
                    window.location.reload();
                  }}
                  className="link"
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
        <div className="right">
          {user && (
            <div className="item">
              <img src={user.avatar} alt="user" />
            </div>
          )}

          <div onClick={toggleTheme} className="item">
            {mode === "dark" ? (
              <BsSun className="icon" />
            ) : (
              <LiaMoonSolid className="icon" />
            )}
          </div>
        </div>
      </div>
      <div className="nav-fix"></div>
    </>
  );
};

export default Navbar;
