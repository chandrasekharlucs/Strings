import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { FormErrorMessage, FormControl } from "@chakra-ui/react";

const Signup = () => {
  const [isValid, setIsValid] = useState(true);

  const [inputs, setInputs] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e, name) => {
    setInputs((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    if (name === "userName") {
      const isValidInput = /^[a-zA-Z0-9_.]+$/.test(e.target.value);
      setIsValid(isValidInput);
    }
  };
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        size={"sm"}
        maxLength={30}
        onChange={(e) => handleChange(e, "email")}
      />
      <FormControl isInvalid={!isValid}>
        <Input
          maxLength={20}
          name="username"
          placeholder="Username"
          fontSize={14}
          type="text"
          value={inputs.userName}
          size={"sm"}
          onChange={(e) => handleChange(e, "userName")}
        />
        {!isValid && (
          <FormErrorMessage>
            Usernames can only use letters, numbers, underscores and periods.
          </FormErrorMessage>
        )}
      </FormControl>
      <Input
        maxLength={20}
        placeholder="Full Name"
        fontSize={14}
        type="text"
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => handleChange(e, "fullName")}
      />
      <InputGroup>
        <Input
          maxLength={20}
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => handleChange(e, "password")}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
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
        onClick={() => isValid && signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
