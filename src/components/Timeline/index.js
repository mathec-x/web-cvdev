import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { useMediaQuery } from 'usehooks-ts';

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
        <ListSubheader component="div">{title}</ListSubheader>
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
                <TimelineItem key={item.uuid+'-'+i}>
                    <TimelineOppositeContent sx={{ p: 0, flex: 0 }} />
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
                            sx={{ borderRadius: 2, ml: -1, mt: -2 }}
                        >
                            <ListItem
                                component="div"
                                button={!!Children}
                                onClick={() => setCollapse([i])}>
                                <ListItemText
                                    primaryTypographyProps={{ variant: 'subtitle2' }}
                                    primary={<>
                                        {item.begin &&
                                            <Typography variant="caption" fontSize={12} display="block">
                                                {new Date(item.begin).toLocaleDateString()} <b>até</b> {item.finish ? new Date(item.finish).toLocaleDateString() : 'Atual'}
                                            </Typography>
                                        }
                                        {item[primaryText]}
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