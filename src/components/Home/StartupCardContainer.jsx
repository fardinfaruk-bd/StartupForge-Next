import { getFounder } from '@/lib/api/startup';
import React from 'react';
import StartupCard from '../ui/StartupCard';

const StartupCardContainer = async ({ startup }) => {
    const founder = await getFounder(startup.founderId);
    console.log(founder);
    return (
        <div>
            <StartupCard startup={startup} founderName={founder?.name}/>
        </div>
    );
};

export default StartupCardContainer;