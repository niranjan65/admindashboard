import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUp } from '../services/operations/authApi.js';
import { Button, Input } from '../index.js';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    console.log("Form data received:", data); 
    try {
      const { name, email, password } = data;


      const response = await dispatch(signUp(name, email, password, navigate ));
      console.log('Signup response:', response); 
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error); 
      setError(error.message || "Failed to create account");
    }
  };

  return (
    <div className="flex items-center justify-center w-full m-9">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <p>Logo</p>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} encType="multipart/form-data">
          <div className="space-y-5">
            <Input
              label=" Name:"
              placeholder="Enter your name"
              autoComplete="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.username && <p className="text-red-600">{errors.username.message}</p>}
            
            
            
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            
            
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
