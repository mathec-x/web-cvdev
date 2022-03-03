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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import Candidate from '../../services/Candidate';
import { Div } from '../../components';
import { DeleteIcon } from '../../components/Icons';
import AutocompleteAsynchronous from '../../components/AutocompleteAsync';
import Skill from '../../services/Skill';

const inputs = {
  occupation: { label: 'Cargo/Função/Projeto', name: 'occupation', type: 'text' },
  begin: { label: 'Data inicio', name: 'begin', type: 'date' },
  company: { label: 'Empresa/Instituição', name: 'company', type: 'text', optional: true },
  finish: { label: 'Data Término', name: 'finish', type: 'date', optional: true },
  description: { label: 'Descrição das atividades', name: 'description', multiline: true, rows: 4 }
}

/** 
 * @type {React.FC<{
 *  candidate: import('@types/web/models').Candidate, 
 *  permission: any}>
 * } 
 */
const Jobs = ({ candidate, permission }) => {
  const [collapse, setCollapse] = React.useState([0, 1]);

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


  const handleConnectSkill = React.useCallback((job, newstate = []) => {
    let skill = {}, choice;

    if (!job.skills && newstate) {
      skill = newstate[0];
      choice = true;
    }
    else if (newstate.length > job.skills.length) {
      skill = newstate.find(state => job.skills?.every(prev => prev.title !== state.title))
      choice = true;
    } else {
      skill = newstate.find(state => job.skills?.some(prev => prev.title === state.title));
      choice = false;
    }

    return Candidate.jobs(job).skills(skill).connect(choice);

  }, [])


  return (
    <Timeline>
      {candidate.jobs.sort((x, y) => new Date(y.begin) - new Date(x.begin)).map((job, i) =>
          <TimelineItem key={job.uuid}>
            <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <List
                dense
                sx={{ borderRadius: 2, ml: -1, mt: -2 }}
              >
                <ListItem
                  dense
                  button
                  onClick={() => setCollapse(state => state.includes(i) ? state.filter(e => e !== i) : [...state, i])}
                  components={{ root: 'div' }}>
                  <ListItemText
                    primaryTypographyProps={{ variant: 'subtitle2' }}
                    primary={job.occupation}
                    secondaryTypographyProps={{ variant: 'caption', color: 'secondary' }}
                    secondary={job.company}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" fontSize={12}>
                      {new Date(job.begin).toLocaleDateString()}-{job.finish ? new Date(job.finish).toLocaleDateString() : 'Atual'}
                      {permission &&
                        <Tooltip title="Excluir Job">
                          <IconButton size="small" onClick={() => handleDeleteJob(job)}>
                            <DeleteIcon color="warning" />
                          </IconButton>
                        </Tooltip>}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Collapse in={collapse.includes(i)}>
                <div style={{ paddingLeft: 10 }}>
                  <Typography variant="caption">
                    {job.description}
                  </Typography>
                </div>
                <Div show={!permission} justifyContent="flex-start" p={1.2}>
                  <Typography variant="caption" display="block" sx={{ width: '100%' }}>
                    Skills:
                  </Typography>
                  {job.skills.map(skill => <Chip label={skill.title} key={skill.uuid} variant="outlined" size="small" sx={{ mr: 1 }} />)}
                </Div>
                <Div show={permission} justifyContent="flex-start" p={1.2}>
                  <AutocompleteAsynchronous
                    OptionLabel="title"
                    multiple
                    value={job.skills}
                    disableUnderline
                    label="Skills"
                    variant="standard"
                    size="small"
                    Service={(e) => Skill.get(e)}
                    OnSet={data => handleConnectSkill(job, data)}
                  />
                </Div>
                <Div show={permission} justifyContent="flex-start" p={1.2}>
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