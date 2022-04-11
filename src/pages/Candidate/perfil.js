import React from 'react';
import Candidate from '../../services/Candidate';

import { useNavigate } from 'react-router-dom';
import { StyledListItem, Div } from '../../components';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardPanel from '../../components/CardPanel';
import { CardMembershipIcon, AccountCircleIcon, EmailIcon } from '../../components/Icons';


/**
 *  @type {React.FC<{
 *  user: import('@types/web/models').User, 
 *  candidate: import('@types/web/models').Candidate, 
 *  permission: any
* }>} 
*/
const Perfil = ({ candidate, permission, user }) => {
    const navigate = useNavigate();

    const update = React.useCallback((
        /** @type {string} */ title,
        /** @type {any}    */ input
    ) => {
        return window
            .Prompt(title, [{ type: 'text', ...input }])
            .then(data => Candidate
                .update(candidate.uuid, data)
                .then((res) => {
                    if (input.name === 'nick') {
                        navigate(`/candidate/${data.nick}`);
                    }
                })
            )

    }, [candidate, navigate])

    return (
        <CardPanel 
            disableTypography 
            title={permission ? ' Editar Meu Currículo' : 'Candidato'}>
            <Div>
                <IconButton
                    disabled={!permission}
                    onClick={() => permission && update('Atualizar imagem de perfil', [{
                        label: 'Cole uma url valida',
                        name: 'image',
                        type: 'url'
                    }])}>
                    <Avatar
                        alt={candidate.name}
                        src={candidate.image}
                        sx={{ width: 106, height: 106 }}
                    />
                </IconButton>
            </Div>
            <List dense subheader={<ListSubheader><Typography>Perfil</Typography></ListSubheader>}>
                <StyledListItem
                    icon={<CardMembershipIcon />}
                    onClick={() => permission && update('Atualizar Nickname', {
                        label: 'Informe o novo apelido, inicie com @',
                        name: 'nick',
                        initialValue: candidate.nick
                    })}
                    button={permission}
                    primary='Nick'
                    secondary={candidate.nick}
                />
                <StyledListItem
                    icon={<AccountCircleIcon />}
                    onClick={() => permission && update('Atualizar Nome', {
                        label: 'Informe o novo Nome',
                        name: 'name',
                        initialValue: candidate.name
                    })}
                    button={permission}
                    primary='Nome'
                    secondary={candidate.name}
                />
                <StyledListItem
                    icon={<EmailIcon />}
                    onClick={() => permission && update('Atualizar Email', {
                        label: 'Informe o novo email',
                        name: 'email',
                        initialValue: candidate.email
                    })}
                    button={permission}
                    primary='Email'
                    secondary={candidate.email}
                />
                <ListSubheader><Typography>About Me</Typography></ListSubheader>
                <StyledListItem
                    onClick={() => permission && update('Sobre Mim', {
                        label: 'Digite sua biografia',
                        name: 'about',
                        initialValue: candidate.about,
                        multiline: true,
                        rows: 9
                    })}
                    button={permission}
                    secondary={<pre style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit'}}>{candidate.about}</pre>}
                />
            </List>
        </CardPanel>)
}

export default Perfil;