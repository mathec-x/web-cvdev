import React from 'react';
import { Button } from '@mui/material';
import Candidate from '../../services/Candidate';

const Home = () => {
    return (
        <div>
            <Button onClick={Candidate.get}>
                Home Component
            </Button>
        </div>
    )
}

export default Home;