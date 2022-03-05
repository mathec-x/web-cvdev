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

const Perfil = ({ candidate, permission }) => {
    const navigate = useNavigate()

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

    }, [candidate])

    return (
    <CardPanel disableTypography title={permission ? ' Editar Meu Currículo' : 'Candidato'}>
        <Div>
            <IconButton onClick={() => update('Atualizar imagem de perfil', {
                label: 'Cole uma url valida',
                name: 'image'
            })}>
                <Avatar
                    alt={candidate.name}
                    src={candidate.image}
                    sx={{ width: 106, height: 106 }}
                />
            </IconButton>
        </Div>
        <List dense subheader={<ListSubheader><Typography>Perfil</Typography></ListSubheader>}>
            <StyledListItem
                onClick={() => update('Atualizar Nickname', {
                    label: 'Informe o novo apelido, inicie com @',
                    name: 'nick',
                    initialValue: candidate.nick
                })}
                button={permission}
                primary='Nick'
                secondary={candidate.nick}
            />
            <StyledListItem
                onClick={() => update('Atualizar Nome', {
                    label: 'Informe o novo Nome',
                    name: 'name',
                    initialValue: candidate.name
                })}
                button={permission}
                primary='Nome'
                secondary={candidate.name}
            />
            <StyledListItem
                onClick={() => update('Atualizar Email', {
                    label: 'Informe o novo email',
                    name: 'email',
                    initialValue: candidate.email
                })}
                button={permission}
                primary='Email'
                secondary={candidate.email}
            />
        </List>
    </CardPanel>)
}

export default Perfil;