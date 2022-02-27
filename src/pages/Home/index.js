import React from 'react';
import { Button } from '@mui/material';
import Skill from '../../services/Skill';

const Home = () => {
    const createSkill = () => {
        window.Prompt('Qual skill', [
            { label: 'tag', name: 'skill', type: 'text', optional: true  },
            { label: 'Lib ex: nodejs | express', name: 'title', type: 'text', optional: true  },
        ]).then(Skill.create)
    }

    return (
        <div>
            <Button onClick={createSkill}>
                Home Component
            </Button>
        </div>
    )
}

export default Home;