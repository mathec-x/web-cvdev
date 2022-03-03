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

function diff_years(dt1, dt2) {
  dt1 = new Date(dt1);
  dt2 = dt2 ? new Date(dt2) : new Date();
 
  var diff = (dt1.getTime() - dt2.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff / 365.25));
}

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
/** @type {React.FC<{candidate: import('@types/web/models').Candidate, permission: any}>} */
const Skills = ({ candidate, permission }) => {
  const [page, setPage] = React.useState(0);

  /**
   * @type { Array<Skill & { points: number }> }
   */
  const skills = React.useMemo(() => {

    const sk = {};
    for (const job of candidate.jobs) {
      const points = diff_years(job.begin, job.finish);
      console.log(job.company ,points)
      for (const skill of job.skills) {
        if(!sk[skill.tag])
          sk[skill.tag] = { ...skill, points  }
        else {

          sk[skill.tag].points += points;
        }
      }
    }

    return Object.values(sk).sort((a,b) => b.points - a.points);

  }, [candidate.jobs]);

  const visibleSkills = React.useMemo(() => {
    return skills.slice(page, page + 1);

  }, [skills, page]);

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
          {skills.map((skill, index) =>
            <StyledListItem
              key={skill.uuid}
              button
              disabled={visibleSkills.First()?.uuid === skill?.uuid}
              onClick={() => setPage(index === 0 ? index : index)}
              primary={
                <Typography fontSize={10} variant="subtitle2">
                  {skill.title}
                  <LinearProgress variant='determinate' value={skill.points} />
                </Typography>}
            />
          )}
        </List>
      </Grid>
      <Grid item xs={8} md={7}>
        {visibleSkills.map((skill) =>
          <Grid item key={skill.uuid}>
            <CardHeader subheader={skill.title} />
            <CircularProgressWithLabel variant="determinate" value={skill.points} label={skill.title} />
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
      </Grid>
    </Grid>
  )
}

export default Skills;