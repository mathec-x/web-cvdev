/* eslint-disable react/prop-types */
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemAction from '@mui/material/ListItemSecondaryAction';
/**
 * Demos:
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 * - [ListItem API](https://material-ui.com/api/list-item/)
 *
 * @type {React.FC< Partial<import('@mui/material').ListItemProps> & {
 *  primary?: React.ReactNode
 *  button?: any
 *  secondary?: React.ReactNode
 *  icon?: React.ReactNode
 *  actions?: React.ReactNode
 * }>}
 */
const StyledListItem = ({
  primary, secondary, icon, actions, ...props
}) => (
  <ListItem {...props}>
    {Boolean(icon) && <ListItemAvatar>{icon}</ListItemAvatar>}
    <ListItemText
      primaryTypographyProps={{ variant: 'subtitle2' }}
      primary={primary}
      secondaryTypographyProps={{variant: 'caption'}}
      secondary={secondary}
    />
    {Boolean(actions)
        && (
          <ListItemAction>
            {actions}
          </ListItemAction>
        )}
  </ListItem>
);

export default StyledListItem;