"use client";
import { deleteOpportunity } from '@/lib/actions/opportunities';
import { TrashBin } from '@gravity-ui/icons';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const AlertDialogBtn = ({ opportunity }) => {
    const router = useRouter();
    const handleDelete = async () => {
        const res = await deleteOpportunity(opportunity._id);
        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Opportunity updated successfully");
            router.refresh();
        }

    }

    return (
        <AlertDialog >
            <Button variant='outline' className={"border border-red-500 text-red-500"}><TrashBin /></Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete opportunity {opportunity.roleTitle} permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{opportunity.roleTitle}</strong> opportunity and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button slot="close" variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog >
    );
};

export default AlertDialogBtn;