import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../services/api';

import { FiPlus, FiSearch } from 'react-icons/fi';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { Note } from '../../components/Note';

export function Home(){
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [notes, setNotes] = useState([]);
  
  const navigate = useNavigate();

  function handleSelectedTag(tagName){
    if(tagName === "all") {
      return setSelectedTags([]);
    }
    const tagAlreadySelected = selectedTags.includes(tagName);

    if(tagAlreadySelected){
      const filteredTags = selectedTags.filter(tag => tag !== tagName);
      setSelectedTags(filteredTags);

    } else{
      setSelectedTags(prevState => [...prevState, tagName]);
    }
  }

  function handleNoteDetails(id){
    navigate(`/details/${id}`);
  }
  
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${selectedTags}`);
    //console.log(response.data[0]);
    
      setNotes(response.data);
    }

    fetchNotes();
    
  }, [selectedTags, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            text="Todos" 
            onClick={() => handleSelectedTag("all")}
            $isactive={selectedTags.length === 0}
          />
        </li>  

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
                text={tag.name}
                onClick={() => handleSelectedTag(tag.name)}
                $isactive={selectedTags.includes(tag.name)}
              />
            </li>
          ))
        }
      
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          icon={FiSearch} 
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(
              note => (
                <Note 
                  key={note.id}
                  data={note} 
                  onClick={() => handleNoteDetails(note.id)}
                />
              )
            )
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}