import React, { useState } from "react";
import { FieldErrors, User } from "../../lib/types/type"; 
import { UserSchema } from "../../lib/schema/schema";
import { z } from "zod";
import { Row } from "./Row";
import Label from "./forms/Label";
import Input from "./forms/Input";
import { Button } from "./forms/Button";

interface RegisterFormProps {
    onCreate: (user: User) => Promise<void>;
}

export function RegisterForm({ onCreate }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedData = UserSchema.parse(formData);
      await onCreate(validatedData);
      setFormData({
        email: "",
        password: "",
        username: "",
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailError = error.errors.find(e => e.path[0] === 'email')?.message || '';
        const passwordError = error.errors.find(e => e.path[0] === 'password')?.message || '';
        const usernameError = error.errors.find(e => e.path[0] === 'username')?.message || '';
        setErrors({ email: emailError, password: passwordError, username: usernameError });
      } else {
        console.error(error);
        setErrors({ email: 'An unknown error occurred.', password: '', username: '' });
      }
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Row className="mb-4">
          <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </Row>
        <Row className="mb-4">
          <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </Row>
        <Row className="mb-4">
          <Label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </Row>
        <div className="flex items-center justify-between">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
