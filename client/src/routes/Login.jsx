import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navVars } from "@/global/global-variables";
import { useDispatch } from "react-redux";
import { setOnLogin } from "@/redux/slices/authUser";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      const loginResponse = await axios.post(
        "http://127.0.0.1:8080/auth/login",
        data,
        { withCredentials: true },
      );
      const userData = await loginResponse.data;

      if (userData.jwtToken) {
        await dispatch(setOnLogin(userData));
        navigate("/after-login");
      }
    } catch (error) {
      const errorMeaage =
        error.response?.data?.message || "Authentication failed";
      setLoginError(errorMeaage);
    }
  };
  return (
    <>
      <div className="bg-pupl absolute inset-0 w-full bg-cover bg-no-repeat">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(0,0,0,0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(0,0,0,0.2)_1px,_transparent_1px)] [background-size:20px_20px]">
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-[20px] bg-black px-[3rem] py-[4rem] text-[white]">
              <div className="flex gap-4">
                <div>image here</div>
                <div className="px-[2rem]">
                  <div className="h-full w-[0.5px] bg-[#9f9f9f]"></div>
                </div>
                <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex w-full flex-col justify-center gap-3 px-[2rem]">
                    <div className="flex flex-col gap-1.5">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...register("userEmail", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Enter a valid email",
                          },
                        })}
                        placeholder="Email"
                      />
                      {errors.userEmail && (
                        <p className="font-pop-i pt-2 text-[12px] text-[red]">
                          {errors.userEmail.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        {...register("userPassword", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        placeholder="********"
                      />
                      {errors.userPassword && (
                        <p className="font-pop-i pt-2 text-[12px] text-[red]">
                          {errors.userPassword.message}
                        </p>
                      )}
                    </div>
                    {loginError && (
                      <p className="font-pop-i pt-2 text-[12px] text-[red]">
                        {loginError}
                      </p>
                    )}
                    <div className="flex flex-col gap-1.5">
                      <Button
                        disabled={isSubmitting}
                        className={isSubmitting ? "bg-red-600" : "bg-amber-500"}
                        type="submit"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => navigate(`/${navVars.REGISTER}`)}
                        type="button"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </form>
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
