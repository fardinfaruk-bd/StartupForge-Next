"use client";

import React from 'react';
// Removed CardBody from the named imports
import { Card, Avatar, Button, Chip, Separator } from '@heroui/react';
// Lucide Icons
import { Mail, Calendar, Shield, Bookmark, Edit, CircleCheck, AlertCircle } from 'lucide-react';
// Gravity UI Icons
import { Gear, ArrowRotateLeft } from '@gravity-ui/icons';
import InfoUpdateModal from './UpdateProfile';

export default function ProfileView({ userData }) {
  // Helper to safely transform the ISO date string to a readable format
  const formatDate = (dateObj) => {
    if (!dateObj) return 'N/A';
    const dateString = dateObj.$date || dateObj;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Main Profile Header Card */}
        <Card className="border-none shadow-md bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md overflow-hidden">
          {/* Accent Header Banner */}
          <div className="h-28 bg-linear-to-r from-teal-500 to-emerald-500" />
          
          {/* Replaced CardBody with a styled div padding container standard to Hero UI cards */}
          <div className="relative px-6 pb-6 pt-0">
            {/* Avatar & Header Elements */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-14 mb-6 space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                <img src={userData?.image} alt={userData?.name} className="w-24 h-24 text-large ring-4 ring-white dark:ring-neutral-900 border-2 border-emerald-500 shadow-lg" />
                <div className="text-center sm:text-left pb-1">
                  <h1 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
                    {userData?.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start">
                    <Chip size="sm" variant="flat" color="success" className="capitalize">
                      {userData?.role}
                    </Chip>
                    <Chip size="sm" variant="dot" color={userData?.status === 'active' ? 'success' : 'danger'} className="capitalize border-none">
                      {userData?.status}
                    </Chip>
                  </div>
                </div>
              </div>
              
              {/* Primary Interaction Area */}
              <div className="flex justify-center space-x-2">
                <InfoUpdateModal currentUser={userData} />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Core User Data Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email Block */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <Mail className="w-5 h-5 text-teal-600 shrink-0" />
                <div className="overflow-hidden w-full">
                  <p className="text-xs text-neutral-400 font-medium">Email Address</p>
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 truncate">
                    {userData?.email}
                  </p>
                </div>
              </div>

              {/* Email Verification Badge */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                {userData?.emailVerified ? (
                  <>
                    <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400 font-medium">Account Security</p>
                      <p className="text-sm font-semibold text-emerald-600">Verified Member</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-400 font-medium">Account Security</p>
                      <p className="text-sm font-semibold text-amber-600">Verification Pending</p>
                    </div>
                  </>
                )}
              </div>

              {/* Plan Membership Tier */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <Bookmark className="w-5 h-5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400 font-medium">Subscription Plan</p>
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 capitalize">
                    {userData?.plan?.replace('_', ' ') || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Time Stamp Sign Up */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400 font-medium">Registration Date</p>
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {formatDate(userData?.createdAt)}
                  </p>
                </div>
              </div>

            </div>

            {/* Account Metadata Footprint */}
            <div className="mt-6 flex items-center justify-between text-xs text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/30 p-3 rounded-lg">
              <span className="flex items-center gap-1 font-mono">
                <Shield className="w-3.5 h-3.5" /> ID: {userData?.id}
              </span>
              <span className="flex items-center gap-1">
                <ArrowRotateLeft className="w-3.5 h-3.5" /> Updated: {formatDate(userData?.updatedAt)}
              </span>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
}