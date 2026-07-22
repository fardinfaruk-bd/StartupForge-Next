import {
  Briefcase,
  Persons,
  Thunderbolt,
  CircleCheck,
  CircleXmark,
  Clock,
  Calendar,
  ShieldCheck
} from '@gravity-ui/icons';
import { DollarSign, Grid } from 'lucide-react';

/**
 * Transforms raw stats object from API into an array of card objects with Gravity UI icons
 */
export function formatDashboardStats(role, rawStats = {}) {
  if (!rawStats) return [];

  switch (role) {
    case 'founder':
      return [
        {
          id: 'total-opps',
          title: 'Total Opportunities',
          value: rawStats.totalOpportunities ?? 0,
          icon: Briefcase,
        },
        {
          id: 'active-opps',
          title: 'Active Opportunities',
          value: rawStats.activeOpportunities ?? 0,
          icon: Thunderbolt,
        },
        {
          id: 'total-apps',
          title: 'Total Applications',
          value: rawStats.totalApplications ?? 0,
          icon: Persons,
        },
        {
          id: 'remaining-quota',
          title: 'Remaining Posts Quota',
          value: `${rawStats.remainingOpportunities ?? 0} / ${rawStats.maxOpportunities ?? 0}`,
          icon: Grid,
        },
      ];

    case 'applicant':
    case 'candidate':
    case 'contributor':
      return [
        {
          id: 'total-applied',
          title: 'Total Applied',
          value: rawStats.totalApplied ?? 0,
          icon: Briefcase,
        },
        {
          id: 'accepted',
          title: 'Accepted Applications',
          value: rawStats.accepted ?? 0,
          icon: CircleCheck,
        },
        {
          id: 'pending',
          title: 'Pending Review',
          value: rawStats.pending ?? 0,
          icon: Clock,
        },
        {
          id: 'rejected',
          title: 'Rejected Applications',
          value: rawStats.rejected ?? 0,
          icon: CircleXmark,
        },
      ];

    case 'admin':
      return [
        {
          id: 'total-users',
          title: 'Total Users',
          value: rawStats.totalUsers ?? 0,
          icon: Persons,
        },
        {
          id: 'total-startups',
          title: 'Approved Startups',
          value: rawStats.totalStartups ?? 0,
          icon: ShieldCheck,
        },
        {
          id: 'total-revenue',
          title: 'Total Revenue',
          value: `$${rawStats.totalRevenue ?? 0}`,
          icon: DollarSign,
        },
        {
          id: 'total-opps',
          title: 'Total Opportunities',
          value: rawStats.totalOpportunities ?? 0,
          icon: Briefcase,
        }
      ];

    default:
      return [];
  }
}