import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

/** @type {React.FC<{candidate: import('../../../@types/models').Candidate, permission: any}>} */
const Jobs = ({ candidate, permission }) => {

    const handleCreateJob = () => {
        window.Prompt('Cadastrar experiência', [
            {label: 'Descrição', name:'description', multiline: true, rows: 4 }
        ])
    }

    return (
        <Timeline>
            <TimelineItem>
                <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
                <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <ListItem dense button component="div" sx={{ borderRadius: 2, ml: -1, mt: -1 }}>
                        <ListItemText
                            primaryTypographyProps={{ variant: 'subtitle2' }}
                            primary="Cargo/Função/Projeto"
                            secondaryTypographyProps={{ variant: 'caption', color: 'secondary' }}
                            secondary="Nome Da Empresa"
                        />
                        <ListItemSecondaryAction>
                            data-data
                        </ListItemSecondaryAction>
                    </ListItem>
                    <div style={{ paddingLeft: 10 }}>
                        <Typography variant="caption">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </Typography>
                    </div>
                </TimelineContent>
            </TimelineItem>
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