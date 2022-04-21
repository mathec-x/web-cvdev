import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

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
        <Typography variant="caption" fontSize={12} display="block" sx={{'@media print': { width: 80 }}}>
            <i>{new Date(props.begin).Format('mm/yyyy')} até {props.finish ? new Date(props.finish).Format('mm/yyyy') : 'Atual'}</i>
        </Typography>
    )
}


const TimeLine = ({
    list = [],
    children: Children,
    actions: Actions,
    icon,
    primaryText,
    secondaryText,
    first,
    title,
    collapsed = [0]
}) => {
    const [collapse, setCollapse] = React.useState(collapsed);
    const print = useMediaQuery('print');

    return (<>
        <Subheader>{title}</Subheader>
        <Timeline>
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
            {list.map((item, i) =>
                <TimelineItem key={item.uuid + '-' + i}>
                    <TimelineOppositeContent sx={{ p: 0, flex: 0, mt: 0, '@media print': { pr: 2 }}}>
                        {print && <OppositeComponent {...item} />}
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
                            sx={{ borderRadius: 2, ml: -1, mt: item[secondaryText] ? -3 : -2, '@media print': { mt: -2 }}}
                        >
                            <ListItem
                                component="div"
                                button={!!Children}
                                onClick={() => setCollapse([i])}>
                                <ListItemText
                                    primaryTypographyProps={{ variant: 'subtitle2' }}
                                    primary={<>
                                        {!print && <OppositeComponent {...item} />}
                                        <b>{item[primaryText]}</b>
                                    </>}
                                    secondaryTypographyProps={{ variant: 'caption', color: 'primary' }}
                                    secondary={item[secondaryText]}
                                />
                                {Actions && <Actions {...item} />}
                            </ListItem>
                        </List>
                        {!!Children &&
                            <Collapse in={collapse.includes(i) || print}>
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