import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Subheader = ({ component = "h1", title, action, icon, children, ...props }) => {
    return (
        <ListSubheader component={component} sx={{m:0, textTransform: 'capitalize'}}>
            {children}
            {action && (
                <Tooltip title={title}>
                    <IconButton sx={{ float: 'right' }} className="noprint" {...props}>
                        {icon}
                    </IconButton>
                </Tooltip>
            )}
        </ListSubheader>
    )
}

export default Subheader;