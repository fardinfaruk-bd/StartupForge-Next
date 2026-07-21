'use client';

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { 
    Button, 
    Input, 
    Label, 
    Modal, 
    TextField,
    useOverlayState 
} from '@heroui/react';
import { Edit, SplinePointer, X, FileImage, ArrowUpToLine } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { revalidateProfilePath } from '@/lib/actions/revalidate';
// Step 1 e banano server action-ti import korun (path thik kore niben)

const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";

export default function InfoUpdateModal({ currentUser }) {
    const modalState = useOverlayState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [fileError, setFileError] = useState('');

    const router = useRouter();

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        setFileError('');
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxFileSize = 5 * 1024 * 1024;

            if (file.size > maxFileSize) {
                setFileError('Image is too large. Please upload an image smaller than 5 MB.');
                handleRemovePreview();
                return;
            }

            setSelectedFile(file);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemovePreview = () => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl('');
        }
        const fileInput = document.getElementById('avatar-file-input');
        if (fileInput) fileInput.value = '';
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (fileError) return;

        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name');
            const email = formData.get('email');
            let imageUrl = currentUser?.image || '';

            if (selectedFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('image', selectedFile);

                const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
                if (!IMGBB_API_KEY) {
                    throw new Error("Missing NEXT_PUBLIC_IMAGE_UPLOAD_API environment variable");
                }

                const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: uploadFormData,
                });

                const uploadData = await uploadResponse.json();
                if (uploadData.success) {
                    imageUrl = uploadData.data.url;
                } else {
                    throw new Error('Image host provider failed to upload file.');
                }
            }

            const updatePayload = {};
            
            if (name !== currentUser?.name) {
                updatePayload.name = name;
            }
            if (imageUrl !== currentUser?.image) {
                updatePayload.image = imageUrl;
            }
            if (email !== currentUser?.email) {
                updatePayload.email = email;
            }

            if (Object.keys(updatePayload).length === 0) {
                modalState.close();
                return;
            }

            const { error } = await authClient.updateUser(updatePayload);
            
            if (error) {
                toast.error(error.message || "Failed to update profile info");
            } else {
                modalState.close();
                toast.success("Profile updated successfully!");
                await revalidateProfilePath();
                router.refresh();
            }
        } catch (error) {
            console.error('Failed to submit profile updates:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button
                color="success"
                variant="shadow"
                startContent={<Edit className="w-4 h-4" />}
                className="font-semibold text-white bg-linear-to-r from-emerald-500 to-teal-600 rounded-lg px-4"
                onPress={modalState.open}
            >
                Update Info
            </Button>

            <Modal state={modalState}>
                <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
                    <Modal.Container className="max-w-lg">
                        <Modal.Dialog className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                            <Modal.CloseTrigger className="text-zinc-500 hover:text-white" />

                            <form onSubmit={onSubmit} className="space-y-0">
                                <Modal.Header className="border-b border-zinc-900 p-6">
                                    <Modal.Heading className="text-xl font-semibold text-zinc-200">
                                        Update Your Info
                                    </Modal.Heading>
                                    <p className="mt-1 text-xs text-zinc-500 leading-normal">
                                        Modify your profile parameters. Profile updates are processed directly to security hosts.
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="p-6 space-y-5">
                                    <TextField defaultValue={currentUser?.name || ''} className="flex flex-col gap-1 w-full">
                                        <Label className="text-zinc-400 font-medium text-sm">Name</Label>
                                        <Input name="name" placeholder="Enter your full name" required className={textInputClass} />
                                    </TextField>

                                    <TextField defaultValue={currentUser?.email || ''} className="flex flex-col gap-1 w-full">
                                        <Label className="text-zinc-400 font-medium text-sm">Email Address</Label>
                                        <Input name="email" placeholder="Enter your email address" type="email" required className={textInputClass} />
                                    </TextField>

                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-zinc-400 font-medium text-sm">Profile Picture</span>
                                        <div className="flex items-center gap-4 mt-1">
                                            <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden shrink-0">
                                                <input 
                                                    id="avatar-file-input"
                                                    type="file" 
                                                    accept="image/*" 
                                                    onChange={handleFileChange} 
                                                    className="hidden" 
                                                />
                                                {previewUrl || currentUser?.image ? (
                                                    <img src={previewUrl || currentUser?.image} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                                )}
                                            </label>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-medium text-zinc-300 truncate">
                                                    {selectedFile ? 'Image changed' : 'Upload image'}
                                                </span>
                                                <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                            </div>
                                        </div>
                                    </div>

                                    {fileError && (
                                        <p className="text-xs font-medium text-danger mt-1">
                                            {fileError}
                                        </p>
                                    )}

                                    {previewUrl && (
                                        <div className="relative flex items-center gap-3 p-3 border border-zinc-800 rounded-xl bg-zinc-900/30 w-full animate-in fade-in zoom-in-95 duration-150">
                                            <img
                                                src={previewUrl}
                                                alt="Uploaded Preview"
                                                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-sm flex-shrink-0"
                                            />
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-xs font-semibold text-emerald-500">
                                                    Selected File
                                                </span>
                                                <div className="flex items-center gap-1 text-zinc-500 text-xs mt-0.5">
                                                    <FileImage className="size-3 flex-shrink-0" />
                                                    <p className="truncate font-medium max-w-[180px]">
                                                        {selectedFile?.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="danger"
                                                isIconOnly
                                                className="rounded-full size-7 min-w-7 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-danger"
                                                onPress={handleRemovePreview}
                                            >
                                                <X className="size-3.5" />
                                            </Button>
                                        </div>
                                    )}
                                </Modal.Body>

                                <Modal.Footer className="border-t border-zinc-900 p-6 flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="bordered"
                                        onPress={modalState.close}
                                        isDisabled={isSubmitting}
                                        className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        isDisabled={isSubmitting || !!fileError}
                                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11 flex items-center gap-2"
                                    >
                                        <SplinePointer className={`size-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                                        {isSubmitting ? 'Updating...' : 'Update'}
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}