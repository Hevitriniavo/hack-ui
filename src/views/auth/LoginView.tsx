import { useCallback, useEffect } from "react";
import { CredentialType, JwtToken } from "../../lib/types/type";
import { LoginForm } from "../../ui/components/LoginForm";
import { getUrlFrom } from "../../lib/api/apiUrl";
import { fetchApi } from "../../lib/api/api";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export function LoginView() {
  const { setValue, value } = useLocalStorage<JwtToken>("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (value) {
      navigate('/');
    }
  }, [value, navigate]);

  const handleLoginWithCredential = useCallback(async (credential: CredentialType) => {
    try {
      const url = getUrlFrom("/sign-in");
      const options: Partial<RequestInit> = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      };
      const apiResponse = await fetchApi<JwtToken>(url, options);
      console.log('Login successful:', apiResponse.data);
      setValue(apiResponse.data);

    } catch (error) {
      console.error('Error during login attempt:', error);
    }
  }, [setValue]);


  const handleLoginWithGoogle = async () => {
    console.log('Login with Google');
  };

  const handleLoginWithGithub = async () => {
    console.log('Login with GitHub');
  };

  return (
    <>
      <LoginForm
        onLoginWithCredential={handleLoginWithCredential}
        onLoginWithGithub={handleLoginWithGithub}
        onLoginWithGoogle={handleLoginWithGoogle}
      />
    </>
  )
}
