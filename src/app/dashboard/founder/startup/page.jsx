import React from 'react';

import { getUserSession } from '@/lib/core/session';
import StartupProfile from './StartupProfile';
import { getFounderStartup } from '@/lib/api/startup';

const MyStartupPage = async () => {

    const user = await getUserSession();
    
    const startup = await getFounderStartup(user?.id);
    return (
        <div>
            <StartupProfile founder={user} founderStartup={startup}></StartupProfile>
        </div>
    );
};

export default MyStartupPage;