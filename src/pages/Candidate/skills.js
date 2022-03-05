import React from 'react';
import List from '@mui/material/List';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Skill from '../../services/Skill';
import Candidate from '../../services/Candidate';
import AutocompleteAsynchronous from '../../components/AutocompleteAsync';
import { Div, CardPanel, CircularProgressWithLabel } from '../../components';

function difference_days(dt1, dt2) {
  const past_date = new Date(dt1);
  const current_date = dt2 ? new Date(dt2) : new Date();

  const difference = (current_date.getFullYear() * 12 + current_date.getMonth()) - (past_date.getFullYear() * 12 + past_date.getMonth());

  return difference / 2; // 6 months
}


/** @type {React.FC<{candidate: import('@types/web/models').Candidate, permission: any}>} */
const Skills = ({ candidate, permission }) => {
  const [collapse, setCollapse] = React.useState([0, 1]);

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

    return Object
      .values(sk)
      .sort((a, b) => b.points - a.points)
      .filter(skill => permission ? true : skill.points > 10);

  }, [candidate, libs, permission]);

  const handleConnectSkill = React.useCallback((current_skill, oldstate, newstate = []) => {
    let newskill = {};
    if (newstate.length > oldstate.length) {
      newskill = newstate.find(state => oldstate.every(prev => prev.title !== state.title))
      return Candidate.libs(newskill).connect(current_skill.tag)
    } else {
      newskill = oldstate.find(state => newstate?.every(prev => prev.title !== state.title));
      return Candidate.libs(newskill).disconnect(current_skill.tag)
    }

  }, []);

  return (
    <Div sx={{ height: '100%', width: '100%' }} alignItems="flex-start" >
      <Grid container spacing={1}>
        {skills.map((skill, index) =>
          <Grid item key={skill.uuid} sm={6} width="50%">
            <CardPanel 
              button 
              titleTypographyProps={{ variant: 'subtitle2', fontSize: 11 }}
              title={skill.title}
              onClick={() => setCollapse( collapse.includes(index) ? [] : index % 2 === 0 ? [index+1, index] : [index-1, index] )}
              subheader={!collapse.includes(index) && <LinearProgress variant='determinate' value={skill.points} />}
            >
              <Collapse in={collapse.includes(index)} mountOnEnter unmountOnExit >
                <>
                  <CircularProgressWithLabel variant="determinate" value={skill.points} label={skill.points + '%'} />
                  <List dense sx={{ minHeight: 72 }}>
                    {permission &&
                      <ListItem>
                        <AutocompleteAsynchronous
                          multiple
                          placeholder="..."
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
                </>
              </Collapse>
            </CardPanel>
          </Grid>
        )}
      </Grid>
    </Div >
  )
}

export default Skills;