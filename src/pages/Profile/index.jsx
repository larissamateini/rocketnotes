import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';

import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { FiArrowLeft, FiCamera, FiUser, FiMail, FiLock } from "react-icons/fi";

import { Container, Form, Avatar } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [ name, setName ] = useState(user.name);
  const [ email, setEmail ] = useState(user.email);
  const [ oldPassword, setOldPassword ] = useState();
  const [ newPassword, setNewPassword ] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  const [ avatar, setAvatar ] = useState(avatarUrl);
  const [ avatarFile, setAvatarFile ] = useState(null);

  function handleGoBackButton(){
    navigate(-1);
  }

  async function handleUpdate(){
    const updatedUserData = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword
    }

    const userUpdated = Object.assign(user, updatedUserData);

    await updateProfile({ user: userUpdated, avatarFile });
  }

  async function handleAvatarChange(event){
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <button type='button' onClick={handleGoBackButton}>
          <FiArrowLeft size={24}/>
        </button>
      </header>

      <Form>
        <Avatar>
          <img 
            src={avatar} 
            alt="Foto do usuário" 
          />

          <label htmlFor="avatar">
            <FiCamera />

            <input 
              id="avatar"
              type="file" 
              onChange={handleAvatarChange}
              />
          </label>
        </Avatar>

        <Input 
          type="text"
          placeholder="Nome"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input 
          type="text"
          placeholder="E-mail"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          type="password"
          placeholder="Senha atual"
          icon={FiLock}
          onChange={e => setOldPassword(e.target.value)}
        />
        
        <Input 
          type="password"
          placeholder="Nova senha"
          icon={FiLock}
          onChange={e => setNewPassword(e.target.value)}
        />

        <Button 
          title="Salvar"
          onClick={handleUpdate}
        />
      </Form>
    </Container>
  );
}