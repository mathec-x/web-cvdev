import React from 'react';
import List from '@mui/material/List';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import Skill from '../../services/Skill';
import Candidate from '../../services/Candidate';
import AutocompleteAsynchronous from '../../components/AutocompleteAsync';
import { Div, CardPanel, CircularProgressWithLabel } from '../../components';
import { InfoIcon } from '../../components/Icons';

function calcDate(date1, date2) {
  const past_date = new Date(date1);
  const current_date = date2 ? new Date(date2) : new Date();

  const diff = Math.floor(current_date.getTime() - past_date.getTime());
  const day = 1000 * 60 * 60 * 24;

  const days = Math.ceil(diff / day);
  const months = Math.ceil(days / 31);
  const years = Math.ceil(months / 12);

  return { days, months, years };
}

/** @type {React.FC<{candidate: import('@types/web/models').Candidate, permission: any}>} */
const Skills = ({ candidate, permission }) => {
  const [collapse, setCollapse] = React.useState([0, 1]);

  const libs = React.useCallback((skill) => {
    return Skill.libs(skill).filter(candidate.libs)

  }, [candidate])

  /**
   * @type { Array<Skill & { points: number, years: number, begin: Date, finish: Date }> }
   */
  const skills = React.useMemo(() => {
    const sk = {};
    for (const job of candidate.jobs) {
      for (const skill of job.skills) {
        if (!sk[skill.tag])
          sk[skill.tag] = { ...skill, 
              points: 0, 
              years: 0, 
              begin: job.begin, 
              finish: job.finish || new Date()
            }

        if (new Date(sk[skill.tag].begin) > new Date(job.begin)) {
          sk[skill.tag].begin = job.begin;
        }

        if (new Date(sk[skill.tag].finish) < new Date(job.finish)) {
          sk[skill.tag].finish = job.finish;
        }

        const { months, years } = calcDate(sk[skill.tag].begin, sk[skill.tag].finish);

        if (sk[skill.tag].years < years) {
          sk[skill.tag].years = years;
        }

        sk[skill.tag].points += months; // each month increment one point 
        sk[skill.tag].points += libs(skill).length; // increment by number of jobs with this skill
      }
    }

    return Object
      .values(sk)
      .sort((a, b) => b.points - a.points)
      .filter(skill => permission ? true : skill.points > 12);

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
              titleTypographyProps={{ variant: 'subtitle2', fontSize: 11, lineHeight: 1 }}
              title={skill.title}
              sx={{ p: 1, opacity: skill.points <= 12 && 0.6 }}
              onClick={() => setCollapse(collapse.includes(index) ? [] : index % 2 === 0 ? [index + 1, index] : [index - 1, index])}
              subheader={!collapse.includes(index)
                ? <LinearProgress variant='determinate' value={parseInt(skill.points.Percent(360))} />
                : <Typography variant="caption" fontSize={9}>{skill.years} anos</Typography>
              }
              action={skill.points <= 12 &&
                <Tooltip title="Pontuação minima não atingida">
                  <InfoIcon fontSize='small' />
                </Tooltip>
              }
            >
              <Collapse in={collapse.includes(index)} mountOnEnter unmountOnExit >
                <CircularProgressWithLabel variant="determinate" value={parseInt(skill.points.Percent(360))} label={skill.points+'pts'} />
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
              </Collapse>
            </CardPanel>
          </Grid>
        )}
      </Grid>
    </Div >
  )
}

export default Skills;