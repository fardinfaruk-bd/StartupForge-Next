import React from 'react';
import AddOpportunityForm from './AddOpportunityForm';
import { loggedInFounderStartup } from '@/lib/api/startup';

const PostOpportunityPage = async() => {

    const startup = await loggedInFounderStartup()
    return (
        <div>
            <AddOpportunityForm startup={startup}/>
        </div>
    );
};

export default PostOpportunityPage;