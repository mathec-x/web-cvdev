import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSocket } from 'socket.io-hook';
import { CardPanel, Container } from '../../components';
import Perfil from './perfil';
import Skills from './skills';
import Jobs from './jobs';
import Grid from '@mui/material/Grid';
import Education from './Education';
import Language from './language';
import { SkeletonLanguages, SkeletonPerfil, SkeletonSkills } from './skeleton';
import NotFound from './notfound';
import { TimelineSkeleton } from '../../components/Timeline';

const GridPerfil = (props) => (
    <Grid item xs={12} sm={4} lg={3} sx={{ '@media print': { maxWidth: '100vw !important' }}} >
        <CardPanel
            sx={{
                mb: 2,
                pl: 2,
                '@media print': {
                    m: 0,
                    p: 0,
                    width: '100%'
                }
            }}
        >
            {!props?.candidate?.nick
                ? <SkeletonPerfil />
                : <Perfil {...props} />
            }
        </CardPanel>
    </Grid>
)

const GridSkills = (props) => (
    <Grid item xs={12} lg={12}>
        <CardPanel
            titleTypographyProps={{ variant: 'caption' }}
            fill={false}
            sx={{
                mb: 2,
                pl: 2,
                pr: 2,
                '@media print': {
                    m: 0,
                    p: 0
                }
            }}
        >
            {props?.candidate?.libs && props.candidate.jobs
                ? <Skills {...props} />
                : <SkeletonSkills />
            }
        </CardPanel>
    </Grid>
)

const GridEducation = (props) => (
    <Grid item xs={12} lg={6} sx={{ height: '100%', minHeight: 275 }}>
        <CardPanel
            fill={false}
            sx={{
                mb: 2,
                pb: 2,
                pl: 2,
                '@media print': {
                    width: '35%',
                    float: 'right',
                    height: '100%',
                    mr: 8
                }
            }}>
            {!props?.candidate?.languages
                ? <SkeletonLanguages />
                : <Language {...props} />
            }
        </CardPanel>
        <CardPanel
            titleTypographyProps={{ variant: 'caption' }}
            fill={false}
            sx={{
                pl: 2,
                display: 'block',
                '@media print': {
                    m: 0,
                    p: 0,
                    width: '65%',
                    float: 'left'
                }
            }}>
            {!props?.candidate?.educations
                ? <TimelineSkeleton child={false} />
                : <Education {...props} />
            }
        </CardPanel>
    </Grid>
)

const GridJobs = (props) => (
    <Grid item xs={12} lg={6}>
        <div className='pagebreak'></div>
        <CardPanel
            fill={false}
            sx={{
                mb: 2,
                pl: 2,
                '@media print': {
                    m: 0,
                    p: 0
                }
            }}>
            {!props?.candidate?.jobs
                ? <TimelineSkeleton child={true} />
                : <Jobs {...props} />
            }
        </CardPanel>
    </Grid>
)


const PageCandidate = () => {
    const user = useSelector(state => state.user);
    const candidate = useSelector(state => state.candidate);
    const candidates = useSelector(state => state.candidates);
    const socket = useSocket();
    const params = useParams();

    React.useEffect(() => {
        socket.emit('subscribe', params.nick);

        return () => {
            // socket.emit('unsubscribe', params.nick);
        }

    }, [socket, params.nick, user]);

    const GridProps = {
        candidate: candidate,
        candidates: candidates,
        permission: candidates.findIndex(e => e.uuid === candidate.uuid) !== -1,
        user: user
    };

    if (candidate?.notFound) {
        return <NotFound params={params} />
    }

    return (
        <>
            <Helmet>
                <title>{params.nick}</title>
            </Helmet>
            <Container spacing={1} p={1} alignContent="flex-start">
                <GridPerfil {...GridProps} />
                <Grid item xs={12} sm={8} lg={9} sx={{ '@media print': { maxWidth: '70vw !important'}}}>
                    <Grid container spacing={1} sx={{'@media print': { flexDirection: 'row-reverse'}}}>
                        <GridSkills {...GridProps} />
                        <GridEducation {...GridProps} />
                        <GridJobs {...GridProps} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default PageCandidate;
