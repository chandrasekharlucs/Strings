import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();
  //usecallback is used to prevent infinite loop(renders),by catching the function
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        // title: title,
        description: description,
        status: status,
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
