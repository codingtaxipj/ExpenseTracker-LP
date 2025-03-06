import login_image from "../assets/login page/login-page-image.svg";
import logo_white from "../assets/logo/logo-expense-white.svg";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";

const Login_Screen = ({ onGoogleClick, onGithubClick }) => {
  return (
    <>
      <div className="absolute inset-0 w-full bg-pupl bg-cover bg-no-repeat">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(0,0,0,0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(0,0,0,0.2)_1px,_transparent_1px)] [background-size:20px_20px]">
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-[20px] bg-black px-[5rem] py-[6rem] text-[white]">
              <div className="flex gap-4">
                <div>
                  <img
                    className="w-[24rem]"
                    src={login_image}
                    alt="login-page-image"
                  />
                </div>
                <div className="px-[5rem]">
                  <div className="h-full w-[0.5px] bg-[#9f9f9f]"></div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 px-[2rem]">
                  <img
                    className="w-[8rem] pb-2"
                    src={logo_white}
                    alt="app-logo"
                  />
                  <h1 className="font-pop-sb text-[24px]">LOGIN</h1>
                  <button
                    onClick={onGoogleClick}
                    className="flex items-center rounded-lg bg-[white] px-6 py-2 font-pop-m text-sm text-[black]"
                  >
                    <FcGoogle className="mr-2 h-6 w-6" />
                    <span>Continue with Google</span>
                  </button>
                  <button
                    onClick={onGithubClick}
                    className="flex items-center rounded-lg bg-[white] px-6 py-2 font-pop-m text-sm text-[black]"
                  >
                    <FaGithub className="mr-2 h-6 w-6 text-[black]" />
                    <span>Continue with GitHub</span>
                  </button>
                  <h6 className="font-pop-r text-[16px]">Track Your Money.</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Login_Screen.propTypes = {
  onGoogleClick: PropTypes.func.isRequired,
  onGithubClick: PropTypes.func.isRequired,
};

export default Login_Screen;
