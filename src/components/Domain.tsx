import { Button } from "@chakra-ui/react";

const Domain = (prop: { name: string, onClick: () => void }) => {
  return (
    <Button className={"custom-button"}
            background={"white"}
            textAlign="center"
            width="100%"
            height="80px"
            onClick={prop.onClick}
    >
      {prop.name}
    </Button>
  );
}
export default Domain;