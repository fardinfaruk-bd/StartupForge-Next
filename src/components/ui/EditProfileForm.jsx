'use client';

import React, { useState } from 'react';
import { 
    Button, 
    Modal, 
    Form, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Select, 
    ListBox 
} from '@heroui/react';
import { Pencil, ArrowUpToLine, Globe, ChevronDown } from '@gravity-ui/icons';
import { updateStartup } from '@/lib/actions/startup';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function EditProfileForm({ startup, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState(startup?.logo || '');
    const [isUploading, setIsUploading] = useState(false);
    
    const [industry, setIndustry] = useState(startup?.industry || 'Technology');
    const [employeeCount, setEmployeeCount] = useState(startup?.employeeCount || '1-10');

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

        const startupName = formData.get('startupName');
        const websiteUrl = formData.get('websiteUrl');
        const location = formData.get('location');
        const description = formData.get('description');

        const newErrors = {};
        if (!startupName) newErrors.startupName = "Company name is required";
        if (!websiteUrl) newErrors.websiteUrl = "Website link is required";
        if (!location) newErrors.location = "Location required";

        if (Object.keys(newErrors).length > 0) {
            setFormErrors(newErrors);
            return;
        }

        const updatedStartupData = {
            name: startupName,
            websiteUrl: websiteUrl,
            industry: industry,
            location: location,
            employeeCount: employeeCount,
            description: description,
            logo: logoUrl || startup?.logo || '',
        };
        console.log(updatedStartupData, "from data");

        try {
            const payload = await updateStartup(updatedStartupData, startup?._id);

            if (payload?.modifiedCount > 0 || payload?.acknowledged) {
                toast.success("Startup profile updated successfully!");
                setFormErrors({});

                if (onUpdate) {
                    onUpdate(updatedStartupData);
                }

                setIsOpen(false);
            } else {
                toast.error("Failed to save changes or no changes made.");
            }
        } catch (err) {
            toast.error("An error occurred while saving.");
        }
    };

    return (
        <>
            <Button 
                onPress={() => setIsOpen(true)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm h-9 px-4 rounded-lg flex items-center gap-2 transition"
            >
                <Pencil size={15} /> Edit Profile
            </Button>

            <Modal>
                <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
                    <Modal.Container>
                        <Modal.Dialog className="bg-zinc-950 border border-zinc-900 text-white max-w-2xl rounded-2xl overflow-hidden shadow-2xl p-0">
                            <Form onSubmit={handleSubmit} validationErrors={formErrors} validationBehavior="aria">
                                {/* Modal Header */}
                                <Modal.Header className="flex items-center justify-between border-b border-zinc-900 px-6 py-4">
                                    <h3 className="text-xl font-bold">Edit Startup Profile</h3>
                                    <Modal.CloseTrigger className="text-zinc-500 hover:text-white transition cursor-pointer">
                                        <X size={18} />
                                    </Modal.CloseTrigger>
                                </Modal.Header>
                                
                                {/* Modal Body */}
                                <Modal.Body className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                                    {/* Company Name & Industry */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <TextField name="startupName" defaultValue={startup?.name || ''} isInvalid={!!formErrors.startupName} className="flex flex-col gap-1 w-full">
                                            <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
                                            <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                                            {formErrors.startupName && <FieldError className="text-xs text-rose-500 mt-1">{formErrors.startupName}</FieldError>}
                                        </TextField>

                                        <Select 
                                            className={selectBoxClass} 
                                            name="industry" 
                                            defaultValue={[startup?.industry || 'Technology']}
                                            onSelectionChange={(keys) => setIndustry((keys))}
                                        >
                                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Industry / Category</Label>
                                            <Select.Trigger className={triggerClasses}>
                                                <Select.Value className="text-white" />
                                                <ChevronDown size={16} className="text-zinc-500" />
                                            </Select.Trigger>
                                            <Select.Popover className={popoverClasses}>
                                                <ListBox className="outline-none">
                                                    <ListBox.Item id="Technology" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                                    <ListBox.Item id="Design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                                                    <ListBox.Item id="Marketing" className={listItemClasses} textValue="Marketing">Marketing</ListBox.Item>
                                                    <ListBox.Item id="Finance" className={listItemClasses} textValue="Finance">Finance</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    {/* Website URL & Location */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <TextField name="websiteUrl" defaultValue={startup?.websiteUrl || ''} isInvalid={!!formErrors.websiteUrl} className="flex flex-col gap-1 w-full">
                                            <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                                            <Input placeholder="https://company.com" className={textInputClass} />
                                            {formErrors.websiteUrl && <FieldError className="text-xs text-rose-500 mt-1">{formErrors.websiteUrl}</FieldError>}
                                        </TextField>

                                        <TextField name="location" defaultValue={startup?.location || ''} isInvalid={!!formErrors.location} className="flex flex-col gap-1 w-full">
                                            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                                            <div className="relative flex items-center">
                                                <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                                <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                                            </div>
                                            {formErrors.location && <FieldError className="text-xs text-rose-500 mt-1">{formErrors.location}</FieldError>}
                                        </TextField>
                                    </div>

                                    {/* Employee Count & Logo Upload */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                                        <Select 
                                            className={selectBoxClass} 
                                            name="employeeCount" 
                                            defaultValue={[employeeCount]}
                                            onSelectionChange={(keys) => setEmployeeCount(Array.from(keys)[0])}
                                        >
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
                                                <label className="w-12 h-12 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                                    <input 
                                                        type="file" 
                                                        accept="image/png, image/jpeg" 
                                                        onChange={handleLogoUpload} 
                                                        className="hidden" 
                                                    />
                                                    {logoUrl ? (
                                                        <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ArrowUpToLine size={16} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                                    )}
                                                </label>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-zinc-300">
                                                        {isUploading ? 'Uploading file...' : 'Upload logo image'}
                                                    </span>
                                                    <span className="text-[10px] text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                                    {formErrors.logo && <span className="text-xs text-rose-500 mt-1">{formErrors.logo}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <TextField name="description" defaultValue={startup?.description || ''} className="flex flex-col gap-1 w-full">
                                        <Label className="text-zinc-400 font-medium text-sm">Brief Description</Label>
                                        <TextArea
                                            placeholder="Tell us about your company's mission and culture..."
                                            rows={3}
                                            className={textAreaClass}
                                        />
                                    </TextField>
                                </Modal.Body>

                                {/* Modal Footer */}
                                <Modal.Footer className="border-t border-zinc-900 px-6 py-4 flex justify-end gap-3">
                                    <Button 
                                        type="button" 
                                        variant="bordered" 
                                        onPress={() => setIsOpen(false)}
                                        className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 text-sm h-10 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="bg-white text-black font-semibold hover:bg-zinc-200 text-sm h-10 px-5 rounded-lg transition"
                                    >
                                        Save Changes
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