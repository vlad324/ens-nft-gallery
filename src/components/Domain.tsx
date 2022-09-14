import { Button } from "@chakra-ui/react";

const Domain = (prop: { name: string }) => {
  return (
    <Button className={"connect-button"}
            background={'white'}
            textAlign="center"
            width="100%"
            height="80px"
            onClick={() => console.log('clicked', prop.name)}
    >
      {prop.name}
    </Button>
  );
}
export default Domain;