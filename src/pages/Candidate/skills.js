import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import Skill from '../../services/Skill';
import Candidate from '../../services/Candidate';
import { Div, CircularProgressWithLabel } from '../../components';
import Tooltip from '@mui/material/Tooltip';
import Gestures from 'react-indiana-drag-scroll';
import Subheader from '../../components/Subheader';

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
  const [tags, setTags] = React.useState([]);

  const setTag = React.useCallback((/**@type {number} */ tag) => {
    setTags(tags.Has(tag) ? tags.filter(x => x !== tag) : [...tags, tag])

  }, [tags])

  const [liblist, setLiblist] = React.useState([]);

  const libs = React.useCallback((skill) => {
    return Skill.libs(skill).filter(candidate.libs)

  }, [candidate.libs])

  /**
   * @type { Array<Skill & { points: number, years: number, begin: Date, finish: Date }> }
   */
  const skills = React.useMemo(() => {
    const sk = {};
    if (candidate.jobs) {
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
    }

    return Object
      .values(sk)
      .sort((a, b) => b.points - a.points)
      .filter(skill => permission ? true : skill.points > 12);

  }, [candidate.jobs, libs, permission]);

  const handleUpdateSkill = React.useCallback((skill) => {
    window.Prompt('Atualizar imagem da skill', [
      { label: `Define um link url para imagem de ${skill.title}`, name: 'image', type: 'url', initialValue: skill.image }
    ])
      .then(({ image }) => {
        if (image && image !== skill.image) {
          Skill.update(skill, { image });
        }
      })
      .catch(() => console.log('Cancel Skill Update'))
  }, []);

  const handleConnectSkill = React.useCallback((skill) => {
    Skill.libs(skill).get('*')
      .then((response) => {
        const newLibList = response.data.filter(x => !candidate.libs.Has({ tag: x.tag })).sort((a, b) => a.title.localeCompare(b.title))
        setLiblist(newLibList);

        window.Prompt(`Habilidades sobre a skill ${skill.title}`, [
          { label: `Informar uma lib`, name: 'title', type: 'text', inputProps: { list: 'libs', autoComplete: 'off' } }
        ])
          .then(({ title }) => {
            if (title) {
              Candidate.libs({ title }).connect(skill.tag)
            }
          })
          .catch(() => console.log('Cancel Skill Connect'))
          .finally(() => setLiblist([]))
      })

  }, [candidate])

  const getChipProps = React.useCallback((lib) => {
    return !permission ? {} : {
      onDelete: () => Candidate.libs(lib).disconnect()
    }
  }, [permission])

  return (
    <>
      <datalist id="libs">
        {liblist.map(lib => <option key={lib.tag} value={lib.title} />)}
      </datalist>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Subheader component="div">Skills</Subheader>
        </Grid>
        <Gestures activationDistance={20}>
          <Grid container
            className="printpadding"
            flexWrap="nowrap" sx={{
              cursor: 'move',
              p: "0 12px",
              '@media print': {
                // p: 6
              }
            }}>
            {skills.map((skill) =>
              <Grid item className="printpadding" key={skill.uuid} p="0 9px">
                <Div flexDirection="column" sx={{ opacity: skill.points <= 12 && 0.5, userSelect: 'none' }}>
                  <CircularProgressWithLabel
                    variant="determinate"
                    value={parseInt(Number(skill.points).Percent(160, 2))}
                  >
                    <IconButton
                      size='small'
                      onClick={() => permission ? handleConnectSkill(skill) : setTag(skill.tag)}
                    >
                      <Tooltip
                        placement='right-start'
                        title={skill.points <= 12 ? "Pontuação mínima não atingida" : `${skill.points}pts`}>
                        <Avatar
                          sx={{ width: 38, height: 38, userSelect: 'none' }}
                          alt={skill.title}
                          src={skill.image}>
                          {skill.title}
                        </Avatar>
                      </Tooltip>
                    </IconButton>
                  </CircularProgressWithLabel>
                  <Typography className="notranslate" noWrap mt={1} fontWeight={550} fontSize={8} letterSpacing={0} align='center' variant='h2'>{skill.title}</Typography>
                  <Typography
                    sx={user?.super && {
                      textDecoration: "underline",
                      cursor: 'pointer',
                      '@media print': {
                        textDecoration: "none",
                      }
                    }}
                    onClick={() => user?.super && handleUpdateSkill(skill)}
                    paragraph
                    variant="caption"
                    textAlign="center"
                    fontSize={9}>
                    {skill.years} anos
                  </Typography>
                </Div>
              </Grid>
            )}
          </Grid>
        </Gestures>
        {candidate.libs.length > 0 &&
          <Grid item xs={12} className="printpadding">
            {/* <ListSubheader component="div" className="noprint">
            Conhecimentos
            </ListSubheader> */}
            <Div justifyContent="flex-start" flexWrap={"wrap"} p={1.2}>
              {skills
                .map(skill => Skill
                  .libs(skill).filter(candidate.libs)
                  .filter(() => tags.length === 0 ? true : tags.some(tag => skill.tag === tag))
                  .map(lib =>
                    <Chip
                      className="notranslate"
                      key={lib.uuid}
                      variant="outlined"
                      avatar={<Avatar alt={skill.title} src={skill.image} />}
                      label={lib.title}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      {...getChipProps(lib)}
                    />
                  )
                )}
              {tags.length > 0 &&
                <i
                  className='noprint'
                  onClick={() => setTags([])}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    fontSize: 12,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}>
                  Limpar seleção
                </i>
              }
            </Div>
          </Grid>
        }
      </Grid>
    </>
  )
}

export default Skills;