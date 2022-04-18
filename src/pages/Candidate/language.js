import React from "react";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Candidate from "../../services/Candidate";
import { AddCircleIcon, DeleteIcon, EditIcon, LanguageIcon, StarOutlineIcon, StarRateIcon } from "../../components/Icons";
import { CardPanel } from "../../components";

const inputs = {
    title: { label: 'Língua', name: 'title', type: 'text' },
    level: { label: 'Level', name: 'level', type: 'text' }
}

/**
 *  @type {React.FC<{
 *  user: import('@types/web/models').User, 
 *  candidate: import('@types/web/models').Candidate, 
 *  permission: any
* }>} 
*/

const Language = ({ candidate, permission }) => {

    const handleCreateLanguages = React.useCallback(() => {
        window.Prompt('Cadastrar Idioma', [
            inputs.title
        ])
            .then(Candidate.languages().create);
    }, [])

    const handleUpdateLanguages = React.useCallback(
        (language) => window.Prompt('Editar Idioma', [
            { ...inputs.title, initialValue: language.title }
        ])
            .then(Candidate.languages(language).update), []);

    const handleDeleteLanguages = React.useCallback(
        (language) => window.Confirm(`Confirma a exclusão de ${language.title}?`).then(Candidate.languages(language).delete), []
    );

    return (
        <CardPanel
            fill={false}
            sx={{ mb: 2, pb: 2, pl: 2, '@media print': { m: 0, p: 0, width: '45%', float: 'right' } }}
        >
            <List
                dense
                subheader={
                    <ListSubheader>
                        Idiomas
                        <IconButton sx={{float:'right'}} className="noprint" onClick={handleCreateLanguages}>
                            <AddCircleIcon />
                        </IconButton>
                    </ListSubheader>}
            >

                {candidate.languages.map((language) => (
                        <ListItem dense key={language.uuid}>
                            <ListItemIcon><Avatar><LanguageIcon fontSize="small" /></Avatar></ListItemIcon>
                            <ListItemText
                                primary={language.title}
                            />
                            <ListItemSecondaryAction>
                                {(!permission && language.level > 5)
                                    ? <Typography variant="caption"><i>Nativo</i></Typography>
                                    : [1, 2, 3, 4, 5].map((lv) =>
                                        <IconButton
                                            onClick={() => permission && Candidate.languages(language).update({level: lv})}
                                            size="small"
                                            key={`start-${lv}`}
                                            sx={{ mr: -1 }}>
                                            {language.level >= lv
                                                ? <StarRateIcon />
                                                : <StarOutlineIcon />
                                            }
                                        </IconButton>
                                    )
                                }

                                {permission && (
                                    <>
                                        <IconButton 
                                            onClick={() => permission && Candidate.languages(language).update({level: 6})}
                                            size="small">
                                            {language.level > 5
                                                ? <StarRateIcon />
                                                : <StarOutlineIcon />
                                            }
                                        </IconButton>

                                        <Tooltip title="Editar Idioma">
                                            <IconButton className='noprint' size="small" onClick={() => handleUpdateLanguages(language)}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir Idioma">
                                            <IconButton className='noprint' size="small" onClick={() => handleDeleteLanguages(language)}>
                                                <DeleteIcon color="warning" />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                )}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </CardPanel >
    )
}

export default Language;