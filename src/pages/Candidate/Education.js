import React from "react";
import { CardPanel } from "../../components";
import TimeLine from "../../components/Timeline";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { DeleteIcon, EditIcon, SchoolIcon } from "../../components/Icons";
import Candidate from "../../services/Candidate";

const inputs = {
    begin: { label: 'Data inicio', name: 'begin', type: 'date' },
    course: { label: 'Curso/Aprendizado', name: 'course', type: 'text' },
    institution: { label: 'Instituição', name: 'institution', type: 'text', optional: true },
    finish: { label: 'Data Término', name: 'finish', type: 'date', optional: true },
    site: { label: 'Site', name: 'site', type: 'url', optional: true }
}

/**
 *  @type {React.FC<{
 *  user: import('@types/web/models').User, 
 *  candidate: import('@types/web/models').Candidate, 
 *  permission: any
* }>} 
*/

const Education = ({ candidate, permission }) => {

    const handleCreateEducation = React.useCallback(() => {
        window.Prompt('Cadastrar Estudo', [
            inputs.begin,
            inputs.course,
            inputs.institution,
            inputs.finish
        ])
            .then(Candidate.educations().create);
    }, [])

    const handleUpdateEducation = React.useCallback(
        (education) => window.Prompt('Editar Estudo', [
            { ...inputs.begin, initialValue: education.begin?.Format('yyyy-mm-dd') || null },
            { ...inputs.course, initialValue: education.course },
            { ...inputs.institution, initialValue: education.institution },
            { ...inputs.finish, initialValue: education.finish?.Format('yyyy-mm-dd') || null },
            { ...inputs.site, initialValue: education.site || null },
        ])
            .then(Candidate.educations(education).update), []);

    const handleDeleteEducation = React.useCallback(
        (education) => window.Confirm(`Confirma a exclusão de ${education.company}?`).then(Candidate.educations(education).delete), []
    );

    return (
        <CardPanel
            titleTypographyProps={{ variant: 'caption' }}
            fill={false}
            sx={{ pl: 2, display: 'block', '@media print': { m: 0, p: 0, width: '65%', float: 'left' } }}
        >
            <TimeLine
                icon={<SchoolIcon fontSize="small" />}
                title="Estudos/Aprendizados"
                list={(candidate?.educations || []).sort((x, y) => new Date(y.begin).getTime() - new Date(x.begin).getTime())}
                primaryText="course"
                secondaryText="institution"
                first={permission &&
                    <ListItem
                        onClick={handleCreateEducation}
                        dense
                        button
                        component="div"
                        sx={{ borderRadius: 2, ml: -1, mt: -1 }}>
                        <ListItemText
                            component="div"
                            primaryTypographyProps={{ variant: 'subtitle2' }}
                            primary="Adicionar Estudo"
                        />
                    </ListItem>
                }
                actions={(course) => permission && (
                    <ListItemSecondaryAction>
                        <Tooltip title="Editar Estudo">
                            <IconButton className='noprint' size="small" onClick={() => handleUpdateEducation(course)}>
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir Estudo">
                            <IconButton className='noprint' size="small" onClick={() => handleDeleteEducation(course)}>
                                <DeleteIcon color="warning" />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                )}
            />
        </CardPanel >
    )
}

export default Education;