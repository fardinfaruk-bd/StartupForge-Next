'use client';

import React, { useState } from 'react';
import { ChevronDown, Pencil } from "@gravity-ui/icons";
import { 
    Button, 
    FieldError, 
    Fieldset, 
    Form, 
    Input, 
    Label, 
    Modal, 
    Select, 
    ListBox, 
    TextArea,
    TextField,
    useOverlayState
} from "@heroui/react";
import { ArrowUpToLine, Globe } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { updateStartup } from '@/lib/actions/startup';

// Layout Shared Style Constants matching your design config
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function EditProfileForm({ startup }) {
    const modalState = useOverlayState(); //
    const router = useRouter();

    const [formErrors, setFormErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState(startup?.logo || '');
    const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setFormErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                setLogoUrl(data.data.url);
                setFormErrors(prev => ({ ...prev, logo: null }));
            } else {
                setFormErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setFormErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        

        const newErrors = {};
        if (!data.startupName) newErrors.startupName = "Company name is required";
        if (!data.websiteUrl) newErrors.websiteUrl = "Website link is required";
        if (!data.location) newErrors.location = "Location coordinates required";

        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors);
            return;
        }

        console.log(data, "Form Data");

        const payload = await updateStartup(data, startup?._id);
        console.log(payload, "Update Payload");

        if (payload?.modifiedCount) {
            toast.success("Startup profile updated successfully!");
            router.refresh();
            setFormErrors({});
            modalState.close();
            
        } else {
            toast.error("Failed to save changes.");
        }
    };

    return (
        <>
            {/* Modal Trigger Button */}
            <Button
                onPress={modalState.open} //
                variant="bordered"
                className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-10 flex items-center gap-2"
            >
                <Pencil size={14} /> Edit Profile
            </Button>

            {/* HeroUI v3 Fixed Nesting Setup */}
            <Modal state={modalState}> {/* */}
                <Modal.Backdrop className="bg-black/60 backdrop-blur-sm"> {/* */}
                    <Modal.Container className="max-w-3xl"> {/* */}
                        <Modal.Dialog className="bg-zinc-950 min-w-5xl border border-zinc-900 rounded-xl overflow-hidden shadow-2xl"> {/* */}
                            <Modal.CloseTrigger className="text-zinc-500 hover:text-white" /> {/* */}
                            
                            <Form onSubmit={handleSubmit} className="space-y-0" validationErrors={formErrors} validationBehavior="aria">
                                <Modal.Header className="border-b border-zinc-900 p-6"> {/* */}
                                    <Modal.Heading className="text-xl font-semibold text-zinc-200"> {/* */}
                                        Update Company Profile
                                    </Modal.Heading>
                                </Modal.Header>
                                
                                <Modal.Body className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"> {/* */}
                                    <Fieldset className="space-y-6 w-full">
                                        {/* ROW 1: Company Name + Industry */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <TextField name="startupName" defaultValue={startup?.name || ''} isInvalid={!!formErrors.startupName} className="flex flex-col gap-1 w-full">
                                                <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
                                                <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                                                {formErrors.startupName && <FieldError className="text-xs text-danger mt-1">{formErrors.startupName}</FieldError>}
                                            </TextField>

                                            <Select className={selectBoxClass} name="industry" defaultValue={[startup?.industry || 'technology']}>
                                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Industry / Category</Label>
                                                <Select.Trigger className={triggerClasses}>
                                                    <Select.Value className="text-white placeholder:text-zinc-600" />
                                                    <ChevronDown size={16} className="text-zinc-500" />
                                                </Select.Trigger>
                                                <Select.Popover className={popoverClasses}>
                                                    <ListBox className="outline-none">
                                                        <ListBox.Item id="technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                                        <ListBox.Item id="design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                                                        <ListBox.Item id="marketing" className={listItemClasses} textValue="Marketing">Marketing</ListBox.Item>
                                                        <ListBox.Item id="finance" className={listItemClasses} textValue="Finance">Finance</ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* ROW 2: Website URL + Location */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <TextField name="websiteUrl" defaultValue={startup?.websiteUrl || ''} isInvalid={!!formErrors.websiteUrl} className="flex flex-col gap-1 w-full">
                                                <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                                                        https://
                                                    </span>
                                                    <Input placeholder="www.company.com" className={`${textInputClass} pl-20`} />
                                                </div>
                                                {formErrors.websiteUrl && <FieldError className="text-xs text-danger mt-1">{formErrors.websiteUrl}</FieldError>}
                                            </TextField>

                                            <TextField name="location" defaultValue={startup?.location || ''} isInvalid={!!formErrors.location} className="flex flex-col gap-1 w-full">
                                                <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                                                <div className="relative flex items-center">
                                                    <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                                    <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                                                </div>
                                                {formErrors.location && <FieldError className="text-xs text-danger mt-1">{formErrors.location}</FieldError>}
                                            </TextField>
                                        </div>

                                        {/* ROW 3: Employee Count + Custom File Logo Upload Block */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                            <Select className={selectBoxClass} name="employeeCount" defaultValue={[startup?.employeeCount || '1-10']}>
                                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Employee Count Range</Label>
                                                <Select.Trigger className={triggerClasses}>
                                                    <Select.Value className="text-white" />
                                                    <ChevronDown size={16} className="text-zinc-500" />
                                                </Select.Trigger>
                                                <Select.Popover className={popoverClasses}>
                                                    <ListBox className="outline-none">
                                                        <ListBox.Item id="1-10" className={listItemClasses} textValue="1-10 employees">1-10 employees</ListBox.Item>
                                                        <ListBox.Item id="11-50" className={listItemClasses} textValue="11-50 employees">11-50 employees</ListBox.Item>
                                                        <ListBox.Item id="51-200" className={listItemClasses} textValue="51-200 employees">51-200 employees</ListBox.Item>
                                                        <ListBox.Item id="201+" className={listItemClasses} textValue="201+ employees">201+ employees</ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>

                                            <div className="flex flex-col gap-1 w-full">
                                                <span className="text-zinc-400 font-medium text-sm">Startup Logo</span>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                                        <input 
                                                            type="file" 
                                                            accept="image/png, image/jpeg" 
                                                            onChange={handleLogoUpload} 
                                                            className="hidden" 
                                                        />
                                                        {logoUrl ? (
                                                            <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                                        )}
                                                    </label>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-zinc-300">
                                                            {isUploading ? 'Uploading file...' : 'Upload image'}
                                                        </span>
                                                        <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                                        {formErrors.logo && <span className="text-xs text-danger mt-1">{formErrors.logo}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 4: Description */}
                                        <TextField name="description" defaultValue={startup?.description || ''} className="flex flex-col gap-1 w-full">
                                            <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
                                            <TextArea
                                                placeholder="Tell us about your company's mission and culture..."
                                                rows={4}
                                                className={textAreaClass}
                                            />
                                        </TextField>
                                    </Fieldset>
                                </Modal.Body>

                                <Modal.Footer className="border-t border-zinc-900 p-6 flex justify-end gap-3"> {/* */}
                                    <Button
                                        type="button"
                                        variant="bordered"
                                        onPress={modalState.close} //
                                        className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        slot={"close"}
                                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                                    >
                                        Save Updates
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}