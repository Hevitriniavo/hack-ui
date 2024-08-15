import React, { useState } from "react";
import { CredentialType, FormErrors } from "../../lib/types/type";
import { Row } from "./Row";
import Label from "./forms/Label";
import Input from "./forms/Input";
import { Button } from "./forms/Button";
import { gitHubImg, googleImg } from "../../assets";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CredentialSchema } from "../../lib/schema/schema";
import { z } from "zod";


interface LoginFormProps {
  onLoginWithCredential: (credential: CredentialType) => Promise<void>;
  onLoginWithGithub: () =>  Promise<void>;
  onLoginWithGoogle: () =>  Promise<void>;
}

export function LoginForm({ onLoginWithCredential, onLoginWithGoogle, onLoginWithGithub }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState<CredentialType>({
    email: "",
    password: ""
  });

  const [error, setError] = useState<FormErrors>({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const validatedCredential = CredentialSchema.parse(credential);
      await onLoginWithCredential(validatedCredential);
      setCredential({
        email: "",
        password: ""
      });
      setError({}); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailError = error.errors.find(e => e.path[0] === 'email')?.message || '';
        const passwordError = error.errors.find(e => e.path[0] === 'password')?.message || '';
        setError({ email: emailError, password: passwordError });
      } else {
        console.error(error);
        setError({ email: 'An unknown error occurred.', password: '' }); 
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-login-form">
      <form onSubmit={onSubmit} className="custom-login-bg bg-gray-100 p-6 rounded-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center my-2">Login</h1>
        <Row className="flex flex-col">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <Input
            autoFocus
            type="email"
            id="email"
            name="email"
            value={credential.email}
            onChange={handleChange}
            className="px-2 py-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
          {error.email && (<span className="text-red-500 mt-1">{error.email}</span>)}
        </Row>
        <Row className="flex flex-col">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={credential.password}
              onChange={handleChange}
              className="px-2 py-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            />
            <button
              onClick={toggleShowPassword}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {!showPassword ?
                <FiEyeOff size={20} /> :
                <FiEye size={20} />
              }
            </button>
          </div>
          {error.password && (<span className="text-red-500 mt-1">{error.password}</span>)}
        </Row>
        <Row className="flex flex-col">
          <Button type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
            Login
          </Button>
        </Row>

        <Row className="flex justify-between items-center space-x-4">
          <Button
            onClick={onLoginWithGoogle}
            type="button"
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 hover:border-gray-400 transition duration-150 ease-in-out">
            <img src={googleImg} className="w-20 h-20 rounded-full mr-2" alt="Google Logo" />
            <span>Login with Google</span>
          </Button>
          <Button
            onClick={onLoginWithGithub}
            type="button" className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 hover:border-gray-400 transition duration-150 ease-in-out">
            <img src={gitHubImg} className="w-20 h-20 rounded-full mr-2" alt="Github Logo" />
            <span>Login with Github</span>
          </Button>
        </Row>
        <Row className="flex items-center justify-evenly">
          <Button className="mr-2.5 cursor-pointer p-1 rounded hover:underline  hover:text-blue-500" >
            Don't you have an account?
          </Button>
          <Button
            className="mr-2.5 cursor-pointer p-1 rounded hover:underline  hover:text-blue-500">
            Forgot password?
          </Button>
        </Row>

      </form>
    </div>
  );
}
