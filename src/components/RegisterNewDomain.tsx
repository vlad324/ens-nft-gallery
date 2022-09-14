import { Button } from "@chakra-ui/react";

const RegisterNewDomain = () => {
  return (
    <Button className={"connect-button"}
            background={'white'}
            textAlign="center"
            width="100%"
            height="80px"
            onClick={() => window.open('https://app.ens.domains/', '_blank')?.focus()}
    >
      Register New Domain
    </Button>
  );
}
export default RegisterNewDomain;