import React from 'react';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
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

// import LinearProgress from '@mui/material/LinearProgress';
// import CardActionArea from '@mui/material/CardActionArea';
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

/**
 *  @type {React.FC<{
    *  user: import('@types/web/models').User, 
    *  candidate: import('@types/web/models').Candidate, 
    *  permission: any
 * }>} 
 */
const Skills = ({ candidate, permission, user }) => {
  const [collapse, setCollapse] = React.useState([]);

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
          sk[skill.tag] = {
            ...skill,
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

  const handleConnectSkill = React.useCallback((skill, lib) => {
    if (lib?.title) {
      Candidate.libs(lib).connect(skill.tag)
    }
  }, []);

  const handleUpdateSkill = React.useCallback((skill) => {

    window.Prompt('Atualizar imagem de skill', [
      { label: `Define um link url para imagem de ${skill.title}`, name: 'image', type: 'url' }
    ])
      .then((data) => {
        Skill.update(skill, data);
      })

  }, [])

  const getChipProps = React.useCallback((skill, lib) => {
    return !permission ? {} : {
      onDelete: () => Candidate.libs(lib).disconnect(skill.tag)
    }
  }, [permission])

  return (
    <Div sx={{ height: '100%', width: '100%' }} alignItems="flex-start" >
      <Grid container spacing={1}>
        {skills.map((skill, index) =>
          <Grid item key={skill.uuid} sm={collapse.includes(index) ? 8 : 4} >
            <CardPanel
              button
              titleTypographyProps={{ variant: 'subtitle2', fontSize: 11, lineHeight: 1 }}
              title={skill.title}
              sx={{ p: 1, opacity: skill.points <= 12 && 0.6 }}
              onClick={() => setCollapse(collapse.includes(index) ? [] : [index])}
              subheader={<Typography variant="caption" fontSize={9}>{skill.years} anos</Typography>}
              action={skill.points <= 12 &&
                <Tooltip title="Pontuação minima não atingida">
                  <InfoIcon fontSize='small' />
                </Tooltip>
              }
            >
              <Collapse in={!collapse.includes(index)} mountOnEnter unmountOnExit >
                <CardContent draggable onDragEnd={console.log} >
                  <CircularProgressWithLabel variant="determinate" value={parseInt(Number(skill.points).Percent(100, 2))}>
                    <IconButton
                      disabled={!user?.super}
                      onClick={() => handleUpdateSkill(skill)}
                    >
                      <Avatar
                        sx={{ width: 38, height: 38 }}
                        src={skill.image}>
                        {skill.title}
                      </Avatar>
                    </IconButton>
                  </CircularProgressWithLabel>
                </CardContent>
              </Collapse>
              <Collapse in={collapse.includes(index)} mountOnEnter unmountOnExit >
                <Div justifyContent="flex-start" flexWrap={"wrap"} p={1.2}>
                  {libs(skill).map(lib =>
                    <Chip
                      key={lib.uuid}
                      label={lib.title}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      {...getChipProps(skill, lib)}
                    />
                  )}
                </Div>
                {permission &&
                  <List dense sx={{ minHeight: 72 }} component="div">
                    <ListItem component="div">
                      <AutocompleteAsynchronous
                        clearOnSet
                        OptionLabel="title"
                        label="nova skill"
                        Service={Skill.libs(skill).get}
                        OnSet={(data) => handleConnectSkill(skill, data)}
                      />
                    </ListItem>
                  </List>
                }
              </Collapse>
            </CardPanel>
          </Grid>
        )}
      </Grid>
    </Div >
  )
}

export default Skills;