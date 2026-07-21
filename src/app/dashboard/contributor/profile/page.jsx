import ProfileView from '@/app/profile/ProfileView';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async() => {
    const user = await getUserSession();
    return (
        <div>
            <ProfileView userData={user} />
        </div>
    );
};

export default page;