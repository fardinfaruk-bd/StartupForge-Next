import { getApplicationByApplicantId } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const contributorApplicationPage = async() => {
    const user = await getUserSession();
    const applications = await getApplicationByApplicantId(user.id)

    console.log("application from application table", applications);
    return (
        <div>
            <h1>Contributor Applications are here</h1>
        </div>
    );
};

export default contributorApplicationPage;