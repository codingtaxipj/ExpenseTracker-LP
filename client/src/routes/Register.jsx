import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { navVars } from "@/global/global-variables";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({});

  useEffect(() => {
    reset({ userEmail: "", userPassword: "" }); // Clear old values
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      setSignupError(null);
      const signupResponse = await axios.post(
        "http://127.0.0.1:8080/auth/sign-up",
        data,
      );
      const signupStatus = signupResponse.data.success;
      if (signupStatus) {
        alert("Registration successfull");
        navigate("/login");
      }
    } catch (error) {
      const errorMeaage =
        error.response?.data?.message || "Registration Failed";
      setSignupError(errorMeaage);
    }
  };
  return (
    <>
      <div className="bg-pupl absolute inset-0 w-full bg-cover bg-no-repeat">
        <div className="h-full w-full bg-[linear-gradient(to_right,_rgba(0,0,0,0.2)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(0,0,0,0.2)_1px,_transparent_1px)] [background-size:20px_20px]">
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-[20px] bg-black px-[3rem] py-[4rem] text-[white]">
              <form
                autoComplete="off"
                className="flex w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex w-full flex-col justify-center gap-3 px-[2rem]">
                  {/* First Name */}
                  <div className="flex flex-col gap-1.5">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      autoComplete="off"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      autoComplete="off"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      autoComplete="off"
                      {...register("userName", {
                        required: "Username is required",
                        minLength: {
                          value: 6,
                          message: "Username must be at least 6 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/, // Allows only alphabets and numbers
                          message:
                            "Username can only contain letters and numbers (no spaces/symbols)",
                        },
                      })}
                      placeholder="Choose a username"
                    />
                    {errors.userName && (
                      <p className="text-sm text-red-500">
                        {errors.userName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      autoComplete="off"
                      {...register("userEmail", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Enter a valid email",
                        },
                      })}
                      placeholder="Enter your email"
                    />
                    {errors.userEmail && (
                      <p className="text-sm text-red-500">
                        {errors.userEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      {...register("userPassword", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      placeholder="Enter a secure password"
                    />
                    {errors.userPassword && (
                      <p className="text-sm text-red-500">
                        {errors.userPassword.message}
                      </p>
                    )}
                  </div>
                  {signupError && (
                    <p className="font-pop-i pt-2 text-[12px] text-[red]">
                      {signupError}
                    </p>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <Button
                      disabled={isSubmitting}
                      className={isSubmitting ? "bg-red-600" : "bg-amber-500"}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                    <Button
                      onClick={() => navigate(`/${navVars.LOGIN}`)}
                      type="button"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
