import React from 'react';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Skill from '../../services/Skill';
import Candidate from '../../services/Candidate';
import AutocompleteAsynchronous from '../../components/AutocompleteAsync';
import { Div, StyledListItem } from '../../components';

function difference_days(dt1, dt2) {
  const past_date = new Date(dt1);
  const current_date = dt2 ? new Date(dt2) : new Date();

  const difference = (current_date.getFullYear() * 12 + current_date.getMonth()) - (past_date.getFullYear() * 12 + past_date.getMonth());

  return difference / 2; // 6 months
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
  const [page, setPage] = React.useState(-1);

  const libs = React.useCallback((skill) => {
    return Skill.libs(skill).filter(candidate.libs)

  }, [candidate])

  /**
   * @type { Array<Skill & { points: number }> }
   */
  const skills = React.useMemo(() => {
    const sk = {};
    for (const job of candidate.jobs) {
      const points = difference_days(job.begin, job.finish);
      // console.log(job.company ,points)
      for (const skill of job.skills) {
        if (!sk[skill.tag])
          sk[skill.tag] = { ...skill, points }
        else {
          sk[skill.tag].points += points;
        }

        sk[skill.tag].points += libs(skill).length;
      }
    }

    return Object.values(sk).sort((a, b) => b.points - a.points);

  }, [candidate]);

  const visibleSkills = React.useMemo(() => {
    return skills.slice(page, page + 1);

  }, [skills, page]);


  const handleConnectSkill = React.useCallback((current_skill, oldstate, newstate = []) => {
    let newskill = {};
    if (newstate.length > oldstate.length) {
      newskill = newstate.find(state => oldstate.every(prev => prev.title !== state.title))
      return Candidate.libs(newskill).connect(current_skill.tag)
    } else {
      newskill = oldstate.find(state => newstate?.every(prev => prev.title !== state.title));
      return Candidate.libs(newskill).disconnect(current_skill.tag)
    }

  }, [candidate]);

  return (
    <Box dense sx={{ minHeight: 138, pt: 0 }}>
      <Grid container spacing={1}>
        {skills.map((skill, index) =>
          <Grid key={skill.uuid} item sm={6} md={12}>
            <Card variant="outlined" sx={{ mb: 0.1 }}>
              <CardActionArea>
                <CardHeader
                  titleTypographyProps={{ variant: 'subtitle2', fontSize: 11 }}
                  title={skill.title}
                  onClick={() => setPage(page === index ? -1 : index)}
                  subheader={page !== index && <LinearProgress variant='determinate' value={skill.points} />}
                />
              </CardActionArea>
              <Collapse in={page === index} mountOnEnter unmountOnExit >
                <CircularProgressWithLabel variant="determinate" value={skill.points} label={skill.points + '%'} />
                <List dense sx={{ minHeight: 138 }}>
                  {permission &&
                    <ListItem>
                      <AutocompleteAsynchronous
                        multiple
                        placeholder="Digite uma skill ..."
                        disableClearable
                        value={libs(skill)}
                        disableUnderline
                        variant="standard"
                        OptionLabel="title"
                        label="Skills"
                        size="small"
                        Service={(e) => Skill.libs(skill).get(e)}
                        OnSet={(data) => handleConnectSkill(skill, libs(skill), data)}
                      />
                    </ListItem>}
                  <Div show={!permission} justifyContent="flex-start" flexWrap={"wrap"} p={1.2}>
                    {libs(skill).map(lib => <Chip label={lib.title} key={lib.uuid} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />)}
                  </Div>
                </List>
              </Collapse>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box >
  )
}

export default Skills;