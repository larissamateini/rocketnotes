import { useState } from "react";
import { api } from '../../services/api';
import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleGoBackButton(){
    navigate(-1);
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deletedLink) {
    setLinks(prevState => prevState.filter(link => link !== deletedLink));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deletedTag) {
    setTags(prevState => prevState.filter(tag => tag !== deletedTag));
  }

  async function handleNewNote() {
    if(!title){
      return alert("Digite o título da nota.");
    }

    if(newLink){
      return alert("Um link digitado não foi adicionado, caso o campo permaneça vazio essa informação será perdida."); 
    }

    if(newTag){
      return alert("Uma tag digitada não foi adicionada, caso o campo permaneça vazio essa informação será perdida."); 
    }

    await api.post("/notes", {
      title, 
      description,
      links,
      tags,
    });

    alert("Nota criada com sucesso.");
    navigate(-1);
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              text="voltar"
              onClick={handleGoBackButton}
            />
          </header>

          <Input 
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea 
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />
          
          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link} 
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }

            <NoteItem 
              isnew 
              placeholder="Novo link"
              value= {newLink} 
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Tags">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag} 
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
                isnew 
                placeholder="Nova tag" 
                value= {newTag} 
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote}
          />

        </Form>
      </main>
    </Container>
  );
}