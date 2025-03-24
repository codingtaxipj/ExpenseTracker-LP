import login_image from "../assets/login page/login-page-image.svg";
//import PropTypes from "prop-types";

const Login = () => {
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
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//Login.propTypes = {};

export default Login;
