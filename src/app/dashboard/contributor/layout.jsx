import { requireRole } from '@/lib/core/session';
import React from 'react';

const ContributorLayout = async({children}) => {
    await requireRole("contributor");
    return children;
};

export default ContributorLayout;