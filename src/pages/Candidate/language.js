import React from "react";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Candidate from "../../services/Candidate";
import { AddCircleIcon, DeleteIcon, EditIcon, LanguageIcon, RadioButtonCheckedIcon, RadioButtonUncheckedIcon } from "../../components/Icons";
import Subheader from "../../components/Subheader";

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

    const getStarRate = React.useCallback((rate) => {
        switch (rate) {
            case 1: return 'Nenhuma';
            case 2: return 'Básico';
            case 3: return 'Intermediário';
            case 4: return 'Avançado';
            case 5: return 'Fluente';
            default: return '';
        }
    }, [])

    const handleDeleteLanguages = React.useCallback(
        (language) => window.Confirm(`Confirma a exclusão de ${language.title}?`).then(Candidate.languages(language).delete), []
    );

    return (
        <List
            dense
            subheader={
                <Subheader
                    action={permission && (
                        <IconButton sx={{ float: 'right' }} className="noprint" onClick={handleCreateLanguages}>
                            <AddCircleIcon />
                        </IconButton>
                    )}
                >
                    Idiomas
                </Subheader>}
        >

            {(candidate?.languages || []).map((language) => (
                <ListItem dense key={language.uuid}>
                    <ListItemIcon className="noprint"><Avatar><LanguageIcon fontSize="small" /></Avatar></ListItemIcon>
                    <ListItemText
                        primary={language.title}
                    />
                    <ListItemSecondaryAction>
                        {(!permission && language.level > 5)
                            ? <Typography color="primary" variant="caption"><i style={{ fontWeight: 650 }}>Nativo</i></Typography>
                            : [1, 2, 3, 4, 5].map((lv) =>
                                <Tooltip title={getStarRate(lv)} key={`start-${lv}`}>
                                    <IconButton
                                        onClick={() => permission && Candidate.languages(language).update({ level: lv })}
                                        size="small"
                                        sx={{ mr: -1.3 }}>
                                        {language.level >= lv
                                            ? <RadioButtonCheckedIcon color="primary" fontSize="small" />
                                            : <RadioButtonUncheckedIcon color="primary" fontSize="small" />
                                        }
                                    </IconButton>
                                </Tooltip>
                            )
                        }

                        {permission && (
                            <>
                                <Tooltip title="Nativo">
                                    <IconButton
                                        className="noprint"
                                        onClick={() => permission && Candidate.languages(language).update({ level: 6 })}
                                        size="small">
                                        {language.level > 5
                                            ? <RadioButtonCheckedIcon />
                                            : <RadioButtonUncheckedIcon />
                                        }
                                    </IconButton>
                                </Tooltip>

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
    )
}

export default Language;