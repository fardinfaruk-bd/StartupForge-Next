import { requireRole } from '@/lib/core/session';
import React from 'react';

const FounderLayout = async({ children }) => {
    await requireRole("founder");
    return children
};

export default FounderLayout;