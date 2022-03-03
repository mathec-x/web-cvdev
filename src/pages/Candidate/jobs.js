import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Collapse from '@mui/material/Collapse';
import Candidate from '../../services/Candidate';
import { Div } from '../../components';
import { DeleteIcon } from '../../components/Icons';

const inputs = {
    occupation: { label: 'Cargo/Função/Projeto', name: 'occupation', type: 'text' },
    begin: { label: 'Data inicio', name: 'begin', type: 'date' },
    company: { label: 'Empresa/Instituição', name: 'company', type: 'text', optional: true },
    finish: { label: 'Data Término', name: 'finish', type: 'date', optional: true },
    description: { label: 'Descrição das atividades', name: 'description', multiline: true, rows: 4 }
}

/** @type {React.FC<{candidate: import('../../../@types/models').Candidate, permission: any}>} */
const Jobs = ({ candidate, permission }) => {
    const [collapse, setCollapse] = React.useState(0);

    const handleCreateJob = () => window.Prompt('Cadastrar experiência', [
        inputs.occupation,
        inputs.begin,
        inputs.company,
        inputs.finish,
        inputs.description
    ]).then(Candidate.jobs().create);

    const handleUpdateJob = React.useCallback(
        (title, input, job) => window.Prompt(title, [input]).then(Candidate.jobs(job).update), []
    );

    const handleDeleteJob = React.useCallback(
        (job) => window.Confirm(`Confirma a exclusão de ${job.title}?`).then(Candidate.jobs(job).delete), []
    );


    return (
        <Timeline>
            {
                candidate.jobs.sort((x, y) => new Date(x.finish) - new Date(y.finish)).map((job, i) =>
                    <TimelineItem key={job.uuid}>
                        <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
                        <TimelineSeparator>
                            <TimelineDot color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <ListItem
                                dense
                                button
                                onClick={() => setCollapse(i)}
                                components={{ root: 'div' }}
                                sx={{ borderRadius: 2, ml: -1, mt: -1 }}>
                                <ListItemText
                                    primaryTypographyProps={{ variant: 'subtitle2' }}
                                    primary={job.occupation}
                                    secondaryTypographyProps={{ variant: 'caption', color: 'secondary' }}
                                    secondary={job.company}
                                />
                                <ListItemSecondaryAction>
                                    <Typography variant="caption" fontSize={12}>
                                        {new Date(job.begin).toLocaleDateString()}-{job.finish ? new Date(job.finish).toLocaleDateString() : 'Atual'}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Collapse in={collapse === i}>
                                <div style={{ paddingLeft: 10 }}>
                                    <Typography variant="caption">
                                        {job.description}
                                    </Typography>
                                </div>
                                <Div justifyContent="flex-start" p={1.2}>
                                    <Typography variant="caption">
                                        Editar:
                                    </Typography>
                                    <Button
                                        onClick={() => handleUpdateJob('Atualizar função', { ...inputs.occupation, initialValue: job.occupation }, job)}
                                        size="small">função
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateJob('Atualizar empresa', { ...inputs.company, initialValue: job.company }, job)}
                                        size="small">empresa
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateJob('Atualizar descrição', { ...inputs.description, initialValue: job.description }, job)}
                                        size="small">descrição
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateJob('Atualizar inicio', { ...inputs.begin, initialValue: job.begin }, job)}
                                        size="small">inicio
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdateJob('Atualizar conclusão', { ...inputs.finish, initialValue: job.finish }, job)}
                                        size="small">conclusão
                                    </Button>
                                    <Tooltip title="Excluir">
                                        <IconButton size="small" onClick={() => handleDeleteJob(job)}>
                                            <DeleteIcon color="warning" />
                                        </IconButton>
                                    </Tooltip>
                                </Div>
                            </Collapse>
                        </TimelineContent>
                    </TimelineItem>
                )
            }
            <TimelineItem>
                <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
                <TimelineSeparator>
                    <TimelineDot color="primary" />
                </TimelineSeparator>
                <TimelineContent>
                    <ListItem
                        onClick={handleCreateJob}
                        dense
                        button
                        component="div"
                        sx={{ borderRadius: 2, ml: -1, mt: -1 }}>
                        <ListItemText
                            primaryTypographyProps={{ variant: 'subtitle2' }}
                            primary="Adicionar experiência"
                        />
                    </ListItem>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}

export default Jobs;