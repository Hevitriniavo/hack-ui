import { useCallback, useEffect, useState } from "react";
import { RegisterForm } from "../../ui/components/RegisterForm";
import { JwtToken, User } from "../../lib/types/type";
import { getUrlFrom } from "../../lib/api/apiUrl";
import { fetchApi } from "../../lib/api/api";
import { useNavigate } from "react-router-dom";

export function RegisterView() {
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleCreate = useCallback(async (user: User) => {
    try {
      const url = getUrlFrom("/sign-up");
      const response = await fetchApi<JwtToken>(url, {
        method: 'POST',
        body: JSON.stringify(user),
      });

      if(!response.error){
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  }, []);

  useEffect(() => {
    if (registrationSuccess) {
      navigate('/login'); 
    }
  }, [registrationSuccess, navigate]);

  return (
    <RegisterForm
      onCreate={handleCreate}
    />
  );
}
