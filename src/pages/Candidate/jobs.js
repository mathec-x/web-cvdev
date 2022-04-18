import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import Chip from '@mui/material/Chip';
import Candidate from '../../services/Candidate';
import { BusinessIcon, DeleteIcon, EditIcon } from '../../components/Icons';
import AutocompleteAsynchronous from '../../components/AutocompleteAsync';
import Skill from '../../services/Skill';
import CardPanel from '../../components/CardPanel';
import TimeLine from '../../components/Timeline';

const inputs = {
  occupation: { label: 'Cargo/Função/Projeto', name: 'occupation', type: 'text' },
  begin: { label: 'Data inicio', name: 'begin', type: 'date' },
  company: { label: 'Empresa/Instituição', name: 'company', type: 'text', optional: true },
  finish: { label: 'Data Término', name: 'finish', type: 'date', optional: true },
  description: { label: 'Descrição das atividades', name: 'description', multiline: true, rows: 4 },
  site: { label: 'Site', name: 'site', type: 'url', optional: true }
}

/**
 *  @type {React.FC<{
 *  user: import('@types/web/models').User, 
 *  candidate: import('@types/web/models').Candidate, 
 *  permission: any
* }>} 
*/

const Jobs = ({ candidate, permission }) => {


  const handleCreateJob = () => window.Prompt('Cadastrar Job', [
    inputs.occupation,
    inputs.begin,
    inputs.company,
    inputs.finish,
    inputs.description
  ]).then(Candidate.jobs().create);

  const handleUpdateJob = React.useCallback(
    (job) => window.Prompt('Editar job', [
      { ...inputs.occupation, initialValue: job.occupation },
      { ...inputs.company, initialValue: job.company },
      { ...inputs.description, initialValue: job.description },
      { ...inputs.begin, initialValue: job.begin?.Format('yyyy-mm-dd') || null },
      { ...inputs.finish, initialValue: job.finish?.Format('yyyy-mm-dd') || null },
      { ...inputs.site, initialValue: job.site || null },
    ])
      .then(Candidate.jobs(job).update), []);

  const handleDeleteJob = React.useCallback(
    (job) => window.Confirm(`Confirma a exclusão de ${job.company}?`).then(Candidate.jobs(job).delete), []
  );

  const handleConnectSkill = React.useCallback((job, skill) => {
    if (skill?.title) {
      return Candidate.jobs(job).skills(skill).connect(true);
    }

  }, []);

  const getChipProps = React.useCallback((job, skill) => {
    return !permission ? {} : {
      onDelete: () => Candidate.jobs(job).skills(skill).connect(false)
    }
  }, [permission])

  return (
    <CardPanel
      titleTypographyProps={{ variant: 'caption' }}
      fill={false}
      sx={{
        pl: 2
      }}
    >
      <TimeLine
        title="Experiências"
        icon={<BusinessIcon fontSize="small" />}
        list={candidate.jobs.sort((x, y) => new Date(y.begin).getTime() - new Date(x.begin).getTime())}
        primaryText="occupation"
        secondaryText="company"
        first={ permission &&
          <ListItem
            onClick={handleCreateJob}
            dense
            button
            component="div"
            sx={{ borderRadius: 2, ml: -1, mt: -1 }}>
            <ListItemText
              component="div"
              primaryTypographyProps={{ variant: 'subtitle2' }}
              primary="Adicionar experiência"
            />
          </ListItem>
        }
        actions={(job) => permission && (
          <ListItemSecondaryAction>
            <Tooltip title="Editar Job">
              <IconButton className='noprint' size="small" onClick={() => handleUpdateJob(job)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir Job">
              <IconButton className='noprint' size="small" onClick={() => handleDeleteJob(job)}>
                <DeleteIcon color="warning" />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        )}
      >
        {(job) => (
          <Box pl={1}>
            {job.site &&
              <Link href={job.site} target="_blank" underline="none">
                <Typography gutterBottom display="block" variant="caption">
                  {job.site}
                </Typography>
              </Link>
            }
            <Typography gutterBottom display="block" variant="caption">
              {job.description}
            </Typography>
            <Typography gutterBottom display="block" variant="caption">
              Conhecimentos
            </Typography>
            <Box width="100%" pt={2}>
              {job.skills.map(skill =>
                <Chip
                  avatar={<Avatar alt={skill.title} src={skill.image} />}
                  className="notranslate"
                  key={skill.uuid}
                  label={skill.title}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                  {...getChipProps(job, skill)}
                />
              )}
            </Box>
            {/* <Box hidden={!permission} width="100%" pt={2}>
            <AutocompleteAsynchronous
              disableUnderline
              disableClearable
              allowCreate={false}
              OptionLabel="formattedAddress"
              value={job?.location}
              placeholder="Pesquisar endereço"
              label="Localização"
              variant="standard"
              Service={(e) => Maps.geocode(e)}
              OnSet={console.log}
            /></Box> */}
            <Box hidden={!permission} width="100%" pt={2}>
              <AutocompleteAsynchronous
                className="notranslate noprint"
                clearOnSet
                OptionLabel='title'
                label="Nova skill"
                Service={(e) => Skill.get(e)}
                OnSet={data => handleConnectSkill(job, data)}
              />
            </Box>
          </Box>
        )}
      </TimeLine>
    </CardPanel >
  )
}

export default Jobs;

/**
 * 

      
<Timeline>
{permission &&
  <TimelineItem className='noprint'>
    <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
    <TimelineSeparator>
      <Avatar><BusinessIcon fontSize="small" /></Avatar>
<TimelineConnector />
    </TimelineSeparator >
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
  </TimelineItem >}
{
  candidate
    .jobs
  .sort((x, y) => new Date(y.begin).getTime() - new Date(x.begin).getTime())
  .map((job, i) =>
    <TimelineItem key={job.uuid}>
      <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
      <TimelineSeparator>
        <Avatar src={job.image}><BusinessIcon /></Avatar>
{ i + 1 < candidate.jobs.length && <TimelineConnector /> }
      </TimelineSeparator >
  <TimelineContent mb={2}>
    <List
      dense
      disablePadding
      sx={{ borderRadius: 2, ml: -1, mt: -2 }}
    >
      <ListItem
        button
        onClick={() => setCollapse([i])}>
        <ListItemText
          primaryTypographyProps={{ variant: 'subtitle2' }}
          primary={<>
            <Typography variant="caption" fontSize={12} display="block">
              {new Date(job.begin).toLocaleDateString()} <b>até</b> {job.finish ? new Date(job.finish).toLocaleDateString() : 'Atual'}
            </Typography>
            {job.occupation}
          </>}
          secondaryTypographyProps={{ variant: 'caption', color: 'primary' }}
          secondary={job.company}
        />
        {permission &&
          <ListItemSecondaryAction>
            <Tooltip title="Editar Job">
              <IconButton className='noprint' size="small" onClick={() => handleUpdateJob(job)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir Job">
              <IconButton className='noprint' size="small" onClick={() => handleDeleteJob(job)}>
                <DeleteIcon color="warning" />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>}
      </ListItem>
    </List>
    <Collapse in={collapse.includes(i) || print}>
      <Box pl={1}>
        {job.site &&
          <Link href={job.site} target="_blank" underline="none">
            <Typography gutterBottom display="block" variant="caption">
              {job.site}
            </Typography>
          </Link>
        }
        <Typography gutterBottom display="block" variant="caption">
          {job.description}
        </Typography>
        <Typography gutterBottom display="block" variant="caption">
          Conhecimentos
        </Typography>
        <Box width="100%" pt={2}>
          {job.skills.map(skill =>
            <Chip
              avatar={<Avatar src={skill.image} />}
              className="notranslate"
              key={skill.uuid}
              label={skill.title}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mb: 1 }}
              {...getChipProps(job, skill)}
            />
          )}
        </Box>
        {/* <Box hidden={!permission} width="100%" pt={2}>
              <AutocompleteAsynchronous
                disableUnderline
                disableClearable
                allowCreate={false}
                OptionLabel="formattedAddress"
                value={job?.location}
                placeholder="Pesquisar endereço"
                label="Localização"
                variant="standard"
                Service={(e) => Maps.geocode(e)}
                OnSet={console.log}
              />
            </Box> 
        <Box hidden={!permission} width="100%" pt={2}>
          <AutocompleteAsynchronous
            className="notranslate noprint"
            clearOnSet
            OptionLabel='title'
            label="Nova skill"
            Service={(e) => Skill.get(e)}
            OnSet={data => handleConnectSkill(job, data)}
          />
        </Box>
      </Box>
    </Collapse>
  </TimelineContent>
    </TimelineItem >
  )
}
</Timeline >

*/
