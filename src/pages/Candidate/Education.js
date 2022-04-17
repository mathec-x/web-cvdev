import React from "react";
import { CardPanel } from "../../components";
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';

const Education = () => {

    return (
        <CardPanel
            fill={false}
            cardProps={{
                sx: {
                    p: 2,
                    mb: 2
                }
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ListSubheader component="div" className="notranslate">Educação</ListSubheader>
                </Grid>
            </Grid>
        </CardPanel>
    )
}

export default Education;