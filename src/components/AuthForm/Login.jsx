import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";

const Login = ({ callBack }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e, name) => {
    setInputs((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (inputs.email) {
      callBack(inputs.email);
    }
  }, [inputs]);

  const { loading, error, login } = useLogin();
  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <Input
        placeholder="Password"
        fontSize={14}
        type="password"
        value={inputs.password}
        size={"sm"}
        onChange={(e) => handleChange(e, "password")}
      />
      {error && (
        <Alert status="error" fontSize={10} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        fontSize={14}
        size={"sm"}
        isLoading={loading}
        onClick={() => login(inputs)}
      >
        Log In
      </Button>
    </>
  );
};

export default Login;
