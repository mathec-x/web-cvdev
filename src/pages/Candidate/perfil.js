import React from 'react';
import Candidate from '../../services/Candidate';

import { useNavigate } from 'react-router-dom';
import { StyledListItem } from '../../components';

import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { CardMembershipIcon, AccountCircleIcon, EmailIcon, AddCircleIcon, DeleteIcon, PlaceIcon, CalendarMonthIcon } from '../../components/Icons';
import { useMediaQuery } from 'usehooks-ts';


/**
 *  @type {React.FC<{
 *  user: import('@types/web/models').User, 
 *  candidate: import('@types/web/models').Candidate, 
 *  permission: any
* }>} 
*/
const Perfil = ({ candidate, permission }) => {
    const navigate = useNavigate();
    const print = useMediaQuery('print');

    const update = React.useCallback((
        /** @type {string} */ title,
        /** @type {any}    */ input
    ) => {
        return window
            .Prompt(title, [{ type: 'text', ...input }])
            .then(data => Candidate
                .update(candidate.uuid, data)
                .then((res) => {
                    switch (res.status) {
                        case 200:
                            if (input.name === 'nick') {
                                navigate(`/candidate/${data.nick}`);
                            }
                            break;
                        default:
                            setTimeout(() => window.Alert("Nickname indisponível ou inválido"), 400)
                            break;
                    }
                })
            )
            .catch(() => console.log('ok'))

    }, [candidate, navigate]);

    const deleteCandidate = React.useCallback(() => {
        window.Confirm(`Deseja excluir permanentemente o candidato ${candidate.nick}`)
            .then(async () => {
                const res = await Candidate.delete(candidate);
                if (res.status === 200) {
                    navigate('/home')
                }
            })
            .catch(() => console.log('No delete'))
    }, [candidate, navigate])


    const candidateLinks = React.useMemo(() => {
        try {
            if (!candidate.links) {
                return []
            }

            return Object.keys(candidate.links).map(e => ({
                icon: candidate.links[e],
                url: e,
                host: new URL(e).host,
                title: new URL(e).pathname
            }))

        } catch (error) {
            return []

        }
    }, [candidate.links])

    return (
        <>
            <div className='print-flex-columns'>
                <Box
                    height={200}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    overflow="hidden"
                    sx={{
                        '@media print': {
                            width: 400,
                            height: 300
                        },
                        '@media (max-device-width: 933px)': {
                            backgroundImage: 'url(/assets/background.png)',
                            backgroundSize: '100%',
                            backgroundRepeat: 'no-repeat'
                        }
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}>
                        <IconButton
                            disabled={!permission}
                            onClick={() => permission && update('Atualizar imagem de perfil', {
                                label: 'Cole uma url valida',
                                name: 'image',
                                type: 'url'
                            })}>
                            <Avatar
                                variant="rounded"
                                alt={candidate.name}
                                src={candidate.image}
                                sx={{
                                    width: 106,
                                    height: 106,
                                    '@media print': {
                                        width: 150,
                                        height: 150,
                                    }
                                }}
                            />
                        </IconButton>
                        <Typography p={2} textAlign="center" color="WindowText" fontWeight={666}>
                            {permission &&
                                <IconButton className="noprint" onClick={deleteCandidate} color="default" aria-label="delete-candidate">
                                    <Tooltip title="deletar cadastro">
                                        <DeleteIcon />
                                    </Tooltip>
                                </IconButton>
                            }
                            {candidate.name}
                        </Typography>
                    </Box>
                </Box>
                <List dense>
                    <ListSubheader sx={{ mt: 2, mb: 2 }}><Typography>Perfil</Typography></ListSubheader>
                    {permission && <>
                        <StyledListItem
                            className="noprint"
                            icon={!print && <Avatar variant='rounded'><CardMembershipIcon /></Avatar>}
                            onClick={() => permission && update('Atualizar Nickname', {
                                label: 'Informe o novo apelido, inicie com @',
                                name: 'nick',
                                initialValue: candidate.nick
                            })}
                            button={permission}
                            primary={candidate.nick}
                        />
                        <StyledListItem
                            className="noprint"
                            icon={!print && <Avatar variant='rounded'><AccountCircleIcon /></Avatar>}
                            onClick={() => permission && update('Atualizar Nome', {
                                label: 'Informe o novo Nome',
                                name: 'name',
                                initialValue: candidate.name
                            })}
                            button={permission}
                            primary='Nome'
                            secondary={candidate.name}
                        />
                    </>
                    }
                    <StyledListItem
                        className={candidate.birthday ? '' : 'noprint'}
                        icon={!print && <Avatar variant='rounded'><CalendarMonthIcon /></Avatar>}
                        onClick={() => permission && update('Atualizar Idade', {
                            label: 'Informe sua data de nascimento',
                            name: 'birthday',
                            type: 'date',
                            initialValue: candidate.birthday?.Format('yyyy-mm-dd')
                        })}
                        button={permission}
                        primary={'Idade'}
                        secondary={candidate.birthday
                            ? (candidate.birthday.toDate()?.DiffYears(new Date().toDate()).Round())
                            : 'Não informada'}
                    />
                    <StyledListItem
                        icon={!print && <Avatar variant='rounded'><EmailIcon /></Avatar>}
                        onClick={() => permission && update('Atualizar Email', {
                            label: 'Informe o novo email',
                            name: 'email',
                            initialValue: candidate.email
                        })}
                        button={permission}
                        primary='Email'
                        secondary={candidate.email}
                    />
                    <StyledListItem
                        className={candidate.addressLine ? '' : 'noprint'}
                        icon={!print && <Avatar variant='rounded'><PlaceIcon /></Avatar>}
                        onClick={() => permission && update('Atualizar linha de endereço', {
                            label: 'Informe apenas cidade, estado / UF',
                            name: 'addressLine',
                            initialValue: candidate.addressLine
                        })}
                        button={permission}
                        primary='Endereço'
                        secondary={candidate.addressLine}
                    />
                </List>
                <List
                    className={candidateLinks?.length > 0 ? '' : 'noprint'}
                    dense
                    component="div">
                    <ListSubheader component="div" sx={{ mt: 2, mb: 2 }}><Typography>Social</Typography></ListSubheader>
                    {candidateLinks.map(link =>
                        <StyledListItem
                            button
                            onClick={() => window.open(link.url)}
                            key={link.url}
                            icon={<Avatar variant="rounded" alt={link.title} src={link.icon} sx={{ p: 1 }} />}
                            primary={link.title}
                            secondary={link.host}
                            actions={permission &&
                                <IconButton className='noprint' onClick={() => {
                                    delete candidate.links[link.url];
                                    return Candidate.update(candidate.uuid, { links: candidate.links });
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    )}
                    {permission &&
                        <StyledListItem
                            button
                            className='noprint'
                            icon={<Avatar variant='rounded'><AddCircleIcon /></Avatar>}
                            primary='Adicionar links'
                            onClick={() => permission && window
                                .Prompt('Incluír link externo', [{
                                    label: `Url ex: https://github.com/${candidate.nick}`,
                                    name: 'link',
                                    type: 'url'
                                }])
                                .then(data => Candidate.update(candidate.uuid, { link: data.link, links: candidate.links }))
                                .catch(() => console.log('ok'))
                            }
                        />
                    }
                </List>
            </div>
            <List dense sx={{
                '@media print': {
                    mt: -3
                }
            }}>
                <StyledListItem
                    onClick={() => permission && update('Sobre Mim', {
                        label: 'Digite sua biografia',
                        name: 'about',
                        initialValue: candidate.about,
                        multiline: true,
                        rows: 9
                    })}
                    button={permission}
                    primary="Biografia"
                    secondary={
                        <Typography
                            variant='caption'
                            component='pre'
                            sx={{
                                whiteSpace: 'pre-wrap'
                            }}>
                            {candidate.about || "não informada ..."}
                        </Typography>}
                />
            </List>
        </>)
}

export default Perfil;