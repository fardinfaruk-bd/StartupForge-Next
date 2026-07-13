'use client';

import React, { useState } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Select, 
    ListBox, 
    Button, 
} from '@heroui/react';
import { ArrowUpToLine, Globe, Factory, ArrowRight, ChevronDown } from '@gravity-ui/icons';
import { createStartup } from '@/lib/actions/startup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Building } from 'lucide-react';
import EditProfileForm from '@/components/ui/EditProfileForm';


const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

export default function StartupProfile({ founder, founderStartup }) {
    const [startup, setStartup] = useState(founderStartup);
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    
    // Explicitly tracks if the user intends to view/interact with the form layout
    const [showForm, setShowForm] = useState(false);

    const router = useRouter();

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
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
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const startupName = formData.get('startupName');
        const websiteUrl = formData.get('websiteUrl');
        const industry = formData.get('industry');
        const location = formData.get('location');
        const employeeCount = formData.get('employeeCount');
        const description = formData.get('description');

        const newErrors = {};
        if (!startupName) newErrors.startupName = "Company name is required";
        if (!websiteUrl) newErrors.websiteUrl = "Website link is required";
        if (!location) newErrors.location = "Location coordinates required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Prioritize form values over existing state data
        const newStartupData = {
            ...(startup?._id && { _id: startup._id }), 
            name: startupName,
            websiteUrl: websiteUrl,
            industry: industry || startup?.industry || 'technology',
            location: location,
            employeeCount: employeeCount || startup?.employeeCount || '1-10',
            description: description,
            logo: logoUrl || startup?.logo || '',
            status: startup?.status || 'Pending',
            founderId: founder.id 
        };

        console.log("Submitted Startup Profile Data:", newStartupData);

        const payload = await createStartup(newStartupData);

        if (payload?.insertedId || payload?.modifiedCount || payload?._id) {
            toast.success(startup ? "Startup profile updated successfully!" : "Startup profile created successfully!");
            setStartup(payload._id ? payload : { ...startup, ...newStartupData });
            
            setShowForm(false);
            router.refresh();
        } else {
            toast.error("Failed to save changes.");
        }

        setErrors({});
    };

    const startRegistration = () => {
        setLogoUrl('');
        setShowForm(true);
    };

    const startEditing = () => {
        setLogoUrl(startup?.logo || '');
        setShowForm(true);
    };

    // --- VIEW CHECK 1: No Startup Registered & Not Editing/Registering ---
    if (!startup?._id && !showForm) {
        return (
            <div className="max-w-2xl mx-auto my-12 bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                    <Building size={24} className="text-zinc-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-zinc-200">No Startup Registered Yet</h2>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                        To start creating structural opportunities and tracking incoming pipelines, configure your workspace profile.
                    </p>
                </div>
                <Button 
                    onPress={startRegistration}
                    className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-all"
                >
                    Register Company <ArrowRight size={16} className="ml-1" />
                </Button>
            </div>
        );
    }

    // --- VIEW CHECK 2: Has Startup Data & Not Interacting with Form ---
    if (startup?._id && !showForm) {
        const getStatusStyles = (status) => {
            switch(status) {
                case 'Approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                case 'Rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            }
        };

        return (
            <div className="max-w-4xl mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6">
                    <div className="flex items-center gap-4">
                        {startup.logo ? (
                            <img src={startup.logo} alt={startup.name} className="w-16 h-16 rounded-xl object-contain bg-zinc-900 p-2 border border-zinc-800" />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <Factory size={24} className="text-zinc-600" />
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{startup.name}</h1>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusStyles(startup.status)}`}>
                                    {startup.status}
                                </span>
                            </div>
                            <a href={startup.websiteUrl} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:underline flex items-center gap-1 mt-1">
                                <Globe size={14} className="text-zinc-500" /> {startup.websiteUrl}
                            </a>
                        </div>
                    </div>
                    <EditProfileForm startup={startup} errors={errors} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Industry Category</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{startup?.industry.charAt(0).toUpperCase() + startup?.industry.slice(1)}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Location</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{startup?.location}</span>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-900 p-4 rounded-lg">
                        <span className="text-xs text-zinc-500 uppercase font-semibold block">Company Scale</span>
                        <span className="text-zinc-300 font-medium mt-1 block">{startup?.employeeCount}</span>
                    </div>
                </div>

                {startup.description && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">About our Vision & Culture</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-xl">
                            {startup?.description}
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // --- VIEW CHECK 3: Form Input & Configuration Setup View ---
    return (
        <div className="max-w-3xl mx-auto my-8 bg-zinc-950 p-8 border border-zinc-900 rounded-xl">
            <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-xl font-semibold text-zinc-200 border-b border-zinc-900 w-full pb-3 mb-2">
                        {startup ? 'Update Company Profile' : 'Configure Workspace Platform'}
                    </legend>

                    {/* ROW 1: Company Name + Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="startupName" defaultValue={startup?.name || ''} isInvalid={!!errors.startupName} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Company Name</Label>
                            <Input placeholder="e.g. Acme Corp" className={textInputClass} />
                            {errors.startupName && <FieldError className="text-xs text-danger mt-1">{errors.startupName}</FieldError>}
                        </TextField>

                        <Select className={selectBoxClass} name="industry" defaultSelectedKeys={[startup?.industry || 'technology']}>
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
                        <TextField name="websiteUrl" defaultValue={startup?.websiteUrl || ''} isInvalid={!!errors.websiteUrl} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                                    https://
                                </span>
                                <Input placeholder="www.company.com" className={`${textInputClass} pl-20`} />
                            </div>
                            {errors.websiteUrl && <FieldError className="text-xs text-danger mt-1">{errors.websiteUrl}</FieldError>}
                        </TextField>

                        <TextField name="location" defaultValue={startup?.location || ''} isInvalid={!!errors.location} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
                            <div className="relative flex items-center">
                                <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                <Input placeholder="City, Country" className={`${textInputClass} pl-10`} />
                            </div>
                            {errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 3: Employee Count + Custom File Logo Upload Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <Select className={selectBoxClass} name="employeeCount" defaultSelectedKeys={[startup?.employeeCount || '1-10']}>
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
                                    {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
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

                {/* Footer Submit / Control Actions Container */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                    <Button
                        type="button"
                        variant="bordered"
                        onPress={() => setShowForm(false)}
                        className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg px-5 font-medium h-11"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                    >
                        {startup ? 'Save Updates' : 'Complete Setup'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}