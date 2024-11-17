import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Container, Content, Links } from "./styles";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
  const [noteData, setNoteData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleGoBackButton(){
    navigate(-1);
  }

  async function handleRemoveNote(){
    const confirm = window.confirm("Deseja remover a nota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}/`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNoteData(){
      const response = await api.get(`/notes/${params.id}`);
      setNoteData(response.data);
    }

    fetchNoteData();
  }, []);

  return (
    <Container>
      <Header/>

      {
        noteData && 
        <main>
          <Content>
            <ButtonText 
              text="Excluir nota" 
              onClick={handleRemoveNote}
            />

            <h1>{noteData.title}</h1>
            <p>{noteData.description}</p>

            { 
              noteData.links &&
              <Section title="Links úteis">
                <Links>

                  {
                    noteData.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }

                </Links>
              </Section>
            }

            {
              noteData.tags &&
              <Section title="Tags">
                {
                  noteData.tags.map((tag) => (
                    <Tag key={String(tag.id)} name={tag.name} />
                  ))
                }
              </Section>
            }
            <Button 
              title="Voltar"
              onClick={handleGoBackButton}
            />
          </Content>
        </main>
      }
    </Container>
  )
}