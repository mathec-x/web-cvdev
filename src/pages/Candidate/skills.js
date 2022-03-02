import React from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import Skill from '../../services/Skill';

import { DeleteIcon } from '../../components/Icons';
import AutocompleteAsynchronous from '../../components/AutocompleteAsync';
import { StyledListItem } from '../../components';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ placeContent: "center", width: "100%", position: 'relative', boxSizing: 'border-box', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={75} sx={{ strokeLinecap: 'round' }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box textAlign={'center'}>
          <Typography variant="subtitle2" component="div" fontSize={11} color="text.primary">
            {props.label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
/** @type {React.FC<{candidate: import('../../../@types/models').Candidate, permission: any}>} */
const Skills = ({ candidate, permission }) => {
  const [page, setPage] = React.useState(0);

  const skills = React.useMemo(() => {
    const sk = [];
    candidate.jobs.map( e => e.skills).forEach( skills => sk.concat({...skills}) ) ;

    return sk;

  }, [candidate]);

  console.log(skills)

  const visibleSkills = React.useMemo(() => {
    return skills.slice(page, page + 1);

  }, [skills, page])

  const handleDeleteSkill = React.useCallback((skill) => {
    window.Confirm(`Excluir ${skill.title}`).then(() => Skill.delete(skill))

  }, [])

  const handleDeleteSkillLib = React.useCallback((skill, lib) => {
    window.Confirm(`Excluir ${lib.title} de ${skill.title}`).then(() => Skill.libs(skill).delete(lib))

  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={4} md={5}>
        <List dense sx={{ minHeight: 138, pt: 0 }}>

          <ListItem>{!!permission &&
              <AutocompleteAsynchronous
                OptionLabel="title"
                label="Adicionar skill"
                variant="standard"
                size="small"
                Service={(e) => Skill.get(e)}
                getOptionDisabled={(e) => skills.map(e => e.title).includes(e.title)}
                OnSet={(/** @type {any} */e) => Skill.create(e)}
              />
            }</ListItem>

          {skills.map((skill, index) =>
            <StyledListItem
              key={skill.uuid}
              button
              disabled={visibleSkills.First()?.uuid === skill?.uuid}
              onClick={() => setPage(index === 0 ? index : index)}
              primary={
                <Typography fontSize={10} variant="subtitle2">
                  {skill.title}
                  <LinearProgress variant='determinate' value={50} />
                </Typography>}
            />
          )}
        </List>
      </Grid>
      <Grid item xs={8} md={7}>
        {/* <Grid container> */}
          {visibleSkills.map((skill) =>
            <Grid item key={skill.uuid}>
              <CardHeader
                // disableTypography
                subheader={skill.title}
                action={
                  <IconButton sx={{ zIndex: 1 }} size="small" onClick={() => handleDeleteSkill(skill)}>
                    <DeleteIcon />
                  </IconButton>
                }
              />
              <CircularProgressWithLabel variant="determinate" value={90} label={skill.title} />
              <List dense sx={{ minHeight: 138 }}>
                <ListItem>
                  <AutocompleteAsynchronous
                    variant="standard"
                    OptionLabel="title"
                    label="+libs"
                    size="small"
                    Service={(e) => Skill.libs(skill).get(e)}
                    getOptionDisabled={(e) => skill.libs.map(e => e.title).includes(e.title)}
                    OnSet={(/** @type {any} */e) => Skill.libs(skill).create(e)}
                  />
                </ListItem>
                {skill.libs.map((lib) =>
                  <StyledListItem
                    sx={{ pb: 0, pt: 0, color: theme => theme.palette.text.primary }}
                    key={lib.uuid}
                    button={permission}
                    onClick={() => handleDeleteSkillLib(skill, lib)}
                    primary={
                      <Typography fontSize={10}>
                        {lib.title} <LinearProgress variant='determinate' value={50} />
                      </Typography>}
                  />
                )}
              </List>
            </Grid>
          )}
        {/* </Grid> */}
      </Grid>
    </Grid>
  )
}

export default Skills;