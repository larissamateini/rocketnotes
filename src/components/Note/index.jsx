import { Container } from "./styles";
import { Tag } from '../Tag';

export function Note({data, ...rest}) {
  return (
    <Container {...rest}>
      <h1>{data.title}</h1>

      {data.tags && 
        <footer>
          {
            data.tags.map(tag => {
              return(
                <Tag key={ tag.id } name={ tag.name }/>
              )
            })
          }
        </footer>
      }

    </Container>
  );
}