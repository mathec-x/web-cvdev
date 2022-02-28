import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import { AddCircleIcon, DeleteIcon } from '../../components/Icons';
import { Div, StyledListItem } from '../../components';
import Skill from '../../services/Skill';

const Skills = ({ candidate, permission }) => {

    const handleCreateSkill = React.useCallback(() => {
        window.Prompt('Nova skill', [
            { label: 'Nome ex: Node Js', name: 'title', method: x => x.Capitalize() }
        ]).then((data) => Skill.create(data))

    }, [candidate])

    const handleDeleteSkill = React.useCallback((skill) => {
        window.Confirm(`Excluir ${skill.title}`).then(() => Skill.delete(skill))

    }, [candidate])

    const handleCreateSkillLib = React.useCallback((skill) => {
        window.Prompt('Nova lib', [
            { label: 'Nome ex: Express, entity framework, prisma ...', name: 'title', method: x => x.Capitalize() }
        ]).then((data) => Skill.libs(skill).create(data))

    }, [candidate])

    const handleDeleteSkillLib = React.useCallback((skill, lib) => {
        window.Confirm(`Excluir ${lib.title} de ${skill.title}`).then(() => Skill.libs(skill).delete(lib) )
        
    }, [candidate])

    return (
        <List dense subheader={(
            <ListSubheader>
                Skills
                <ListItemSecondaryAction>
                    <Div show={permission}>
                        <IconButton onClick={handleCreateSkill}>
                            <AddCircleIcon color="primary" fontSize='large' />
                        </IconButton>
                    </Div>
                </ListItemSecondaryAction>
            </ListSubheader>)
        }>
            {candidate.skills.map(skill =>
                <div key={skill.uuid}>
                    <StyledListItem
                        button={permission}
                        onClick={() => handleCreateSkillLib(skill)}
                        primary={skill.title}
                        actions={
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => handleDeleteSkill(skill)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        }
                    />
                    {skill.libs.map(lib =>
                        <StyledListItem
                            icon={<>-</>}
                            key={lib.uuid}
                            button={permission}
                            primary={lib.title}
                            actions={
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleDeleteSkillLib(skill, lib)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            }
                        />
                    )}
                </div>
            )}
        </List >
    )
}

export default Skills;