import React from "react";
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { Container, StyledListItem, CardPanel } from '../../components';


export const SkeletonPerfil = React.memo(() => (
   <>
      <Box
         height={200}
         display="flex"
         justifyContent="center"
         alignItems="center"
         position="relative"
         overflow="hidden"
      >
         <Box sx={{ textAlign: 'center' }}>
            <Skeleton variant="rectangular" width={120} height={120} />
            <Typography p={2} textAlign="center" color="WindowText" fontWeight={666}>
               <Skeleton variant="text" />
            </Typography>
         </Box>
      </Box>
      {Array.from({ length: 2 }).map((_, x) =>
         <List dense key={`perfil-${x}`}>
            <ListSubheader sx={{ mt: 2, mb: 2 }}>
               <Typography> <Skeleton width={75} variant="text" /></Typography>
            </ListSubheader>
            {[0, 1, 2].map((_, y) =>
               <StyledListItem
                  key={`perfil-${x}-${y}`}
                  icon={<Skeleton variant="rectangular" width={40} height={40} />}
                  primary={<Skeleton width={100} variant="text" />}
                  secondary={<Skeleton width={150} variant="text" />}
               />
            )}
         </List>
      )}
   </>
))

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }

export const SkeletonSkills = React.memo(() => (
   <Grid container spacing={1}>
      <Grid item xs={12} m={2}>
         <Skeleton height={20} width={100} variant="text" />
      </Grid>
      <Grid container flexWrap="nowrap" sx={{ p: "0 12px" }}>
         {Array.from({ length: 8 }).map((_, x) =>
            <Grid item key={`skills-${x}`} p="0 8px" >
               <Box flexDirection="column">
                  <Skeleton variant="circular" width={68} height={68} sx={{mb:2}} />
                  <Skeleton height={14} sx={{mb:0.5}} variant="text" />
                  <Skeleton height={10} width={50} sx={{m: '0 auto'}} variant="text" />
               </Box>
            </Grid>
         )}
      </Grid>
      <Grid item xs={12}>
         <Skeleton sx={{ m: 2 }} height={20} width={75} variant="text" />
         <Box justifyContent="flex-start" flexWrap={"wrap"} p={1.2}>
            {Array.from({ length: 25 }).map((_, x) =>
               <Chip
                  key={`libs-${x}`}
                  variant="outlined"
                  avatar={<Skeleton variant="circular" width={18} height={18} />}
                  label={<Skeleton height={15} width={getRndInteger(30, 75)} variant="text" />}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
               />
            )}
         </Box>
      </Grid>
   </Grid>
))

export const SkeletonLanguages = React.memo(() => (
   <List dense>
      <ListSubheader><Skeleton sx={{mt:2, mb:2}} height={20} width={75} variant="text" /></ListSubheader>
      {Array.from({ length: 3 }).map((_, x) => (
         <StyledListItem
            key={`languages-${x}`}
            icon={<Skeleton variant="rectangular" width={40} height={40} />}
            primary={<Skeleton width={100} variant="text" />}
            actions={<Skeleton width={150} variant="text" />}
         />
      ))
      }
   </List>
))

const PageSkeleton = () => {
   return (
      <Container spacing={1} p={1} alignContent="flex-start">
         <Grid item xs={12} sm={4} lg={3}>
            <CardPanel sx={{ mb: 2, pl: 2 }}>
               <SkeletonPerfil />
            </CardPanel>
         </Grid>
         <Grid item xs={12} sm={8} lg={9} sx={{ minHeight: '60vh' }}>
            <Grid container spacing={1}>
               <Grid item xs={12} lg={12}>
                  <CardPanel fill={false} sx={{ mb: 2, pl: 2, pr: 2 }}>
                     <SkeletonSkills />
                  </CardPanel>
               </Grid>
               <Grid item xs={12} lg={6}>
                  <CardPanel fill={false} sx={{ mb: 2, pb: 2, pl: 2 }}>
                     <SkeletonLanguages />
                  </CardPanel>
               </Grid>
               <Grid item xs={12} lg={6}>

               </Grid>
            </Grid>
         </Grid >
      </Container >
   )
}

export default PageSkeleton;