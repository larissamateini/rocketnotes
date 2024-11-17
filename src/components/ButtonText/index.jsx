import { Container } from "./styles";

export function ButtonText({ text, isActive = false, ...rest }) {
  return (
    <Container
      type="button"
      $isactive={isActive.toString()} 
      {...rest}
    >
      {text}
    </Container>
  );
}