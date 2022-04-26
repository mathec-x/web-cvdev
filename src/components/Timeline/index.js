import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { useMediaQuery } from 'usehooks-ts';
import Subheader from '../Subheader';


const OppositeComponent = (props) => {
    return props.begin && (
        <Typography variant="caption" fontSize={12} sx={{ display: !props.print ? 'block' : 'none', '@media print': { width: 80, display: props.print ? 'block' : 'none' } }}>
            <i>{new Date(props.begin).Format('mm/yyyy')} até {props.finish ? new Date(props.finish).Format('mm/yyyy') : 'Atual'}</i>
        </Typography>
    )
}


export const TimelineSkeleton = React.memo((props) => (<>
    <Subheader><Skeleton sx={{mt:2}} variant='text' width={100} height={24} /></Subheader>
    <Timeline>
        {Array.from({ length: 3 }).map((_, i) =>
            <TimelineItem key={'timeline-skeleton-' + i}>
                <TimelineOppositeContent sx={{ p: 0, flex: 0, mt: 0 }} />
                <TimelineSeparator>
                    <Skeleton variant="circular" width={42} height={42} />
                    {i < 2 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent mb={2}>
                    <List
                        component="div"
                        dense
                        disablePadding
                        sx={{ borderRadius: 2, ml: -1, mt: -2 }}
                    >
                        <ListItem component="div">
                            <ListItemText
                                primaryTypographyProps={{ variant: 'subtitle2' }}
                                primary={<Skeleton variant="text" width={90} />}
                                secondaryTypographyProps={{ variant: 'caption', color: 'primary' }}
                                secondary={<Skeleton variant="text" width={135} />}
                            />
                        </ListItem>
                    </List>
                    {props.child &&
                        <Box pl={1}>
                            <Typography gutterBottom display="block" variant="caption">
                                <Skeleton variant="text"  />
                                <Skeleton variant="text" width={250}/>
                            </Typography>
                        </Box>}
                </TimelineContent>
            </TimelineItem>
        )}
    </Timeline>
</>))

const TimeLine = ({
    list = [],
    children: Children,
    actions: Actions,
    icon,
    primaryText,
    secondaryText,
    first,
    title,
    collapsed = [0],
    ...props
}) => {
    const [collapse, setCollapse] = React.useState(collapsed);
    const print = useMediaQuery('print');

    return (<>
        <Subheader>{title}</Subheader>
        <Timeline {...props}>
            {!!first &&
                <TimelineItem className='noprint'>
                    <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
                    <TimelineSeparator>
                        {icon
                            ? <Avatar>{icon}</Avatar>
                            : <TimelineDot color="primary" />
                        }
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        {first}
                    </TimelineContent>
                </TimelineItem>}
            {list.length === 0 &&
                <TimelineItem className='noprint' sx={{ opacity: 0.5 }}>
                    <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
                    <TimelineSeparator>
                        {icon
                            ? <Avatar>{icon}</Avatar>
                            : <TimelineDot color="primary" />
                        }
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <List
                            component="div"
                            dense
                            disablePadding
                            sx={{ borderRadius: 2, ml: -1, mt: -2 }}
                        >
                            <ListItem component="div" >
                                <ListItemText
                                    primaryTypographyProps={{ variant: 'subtitle2' }}
                                    primary={<>
                                        <b>Não informado</b>
                                    </>}
                                    secondaryTypographyProps={{ variant: 'caption', color: 'primary' }}
                                    secondary="Adicione alguns items na sua linha do tempo"
                                />
                            </ListItem>
                        </List>
                    </TimelineContent>
                </TimelineItem>
            }
            {list.map((item, i) =>
                <TimelineItem key={item.uuid + '-' + i}>
                    <TimelineOppositeContent sx={{ p: 0, flex: 0, mt: 0, '@media print': { pr: 2 } }}>
                        <OppositeComponent print={true} {...item} />
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        {icon
                            ? <Avatar src={item.image} alt={item[secondaryText]}>{icon}</Avatar>
                            : <TimelineDot color="primary" />
                        }
                        {i + 1 < list.length && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent mb={2}>
                        <List
                            component="div"
                            dense
                            disablePadding
                            sx={{ borderRadius: 2, ml: -1, mt: item[secondaryText] ? -3 : -2, '@media print': { mt: item[secondaryText] ? -2 : -1 } }}
                        >
                            <ListItem
                                component="div"
                                button={!!Children}
                                onClick={() => setCollapse([i])}>
                                <ListItemText
                                    primaryTypographyProps={{ variant: 'subtitle2' }}
                                    primary={<>
                                        <OppositeComponent {...item} />
                                        <b>{item[primaryText]}</b>
                                    </>}
                                    secondaryTypographyProps={{ variant: 'caption', color: 'primary', className: 'notranslate' }}
                                    secondary={item[secondaryText]}
                                />
                                {Actions && <Actions {...item} />}
                            </ListItem>
                        </List>
                        {!!Children &&
                            <Collapse unmountOnExit={false} translate="yes" in={collapse.includes(i) || print} timeout={100}>
                                <Children {...item} />
                            </Collapse>
                        }
                    </TimelineContent>
                </TimelineItem>
            )}
        </Timeline>
    </>)
}

export default TimeLine;