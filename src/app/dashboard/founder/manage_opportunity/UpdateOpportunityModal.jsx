"use client"
import { updateOpportunity } from '@/lib/actions/opportunities';
import { PencilToLine } from '@gravity-ui/icons';
import { Button, FieldError, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea, Fieldset, Form } from '@heroui/react';
import { Briefcase, Calendar, Clock, FileText, Folder, LaptopMinimal, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UpdateOpportunityModal = ({ opportunity }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const newErrors = {};

        // 1. Role Title Validation
        if (!data.roleTitle || !data.roleTitle.trim()) {
            newErrors.roleTitle = "Please enter a valid role title.";
        }

        // 2. Work Type Validation
        if (!data.workType) {
            newErrors.workType = "Please select a workspace setup.";
        }

        // 3. Conditional Location Validation (Required if NOT remote)
        if (data.workType && data.workType !== "remote" && (!data.location || !data.location.trim())) {
            newErrors.location = "Location is required for non-remote roles.";
        }

        // 4. Commitment Level Validation
        if (!data.commitment) {
            newErrors.commitment = "Please select a commitment structure.";
        }

        // 5. Salary Range Validation
        if (!data.minSalary) {
            newErrors.minSalary = "Minimum salary is required.";
        }
        if (!data.maxSalary) {
            newErrors.maxSalary = "Maximum salary is required.";
        } else if (Number(data.maxSalary) < Number(data.minSalary)) {
            newErrors.maxSalary = "Maximum salary cannot be less than minimum salary.";
        }

        // 6. Application Deadline Validation
        if (!data.deadline) {
            newErrors.deadline = "Please select an application deadline.";
        }

        // 7. Text Details Validation
        if (!data.details || !data.details.trim()) {
            newErrors.details = "Please provide opportunity details.";
        }

        // 8. Required Skills Validation
        if (!data.requiredSkills || !data.requiredSkills.trim()) {
            newErrors.requiredSkills = "Please provide required skills.";
        }

        // Stop execution if errors exist
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const res = await updateOpportunity(opportunity._id, data);
        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Opportunity updated successfully");
            router.refresh();
        }
    }
    return (
        <Modal>
            <Button variant='outline' className={"border border-blue-500 text-blue-500"}><PencilToLine /></Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md md:max-w-3xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <PencilToLine className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Update Opportunity</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form to update the opportunity
                            </p>
                        </Modal.Header>
                        <Modal.Body >
                            <Surface variant="default">
                                <Form onSubmit={onSubmit} validationBehavior="aria">
                                    <Fieldset className="flex flex-col gap-6 w-full">

                                        {/* Two-Column Form Layout matching the style guide spacing */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full items-start">

                                            {/* 1. Role Title */}
                                            <TextField
                                                isRequired
                                                defaultValue={opportunity.roleTitle}
                                                isInvalid={!!errors.roleTitle}
                                                className="flex flex-col w-full gap-1.5"
                                            >
                                                <Label className="text-sm font-medium text-gray-700">Role Title</Label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3 text-gray-400 z-10">
                                                        <Briefcase width="16" />
                                                    </span>
                                                    <Input
                                                        name="roleTitle"
                                                        aria-label="Role Title"
                                                        placeholder="e.g. Senior Frontend Engineer"
                                                        className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                                    />
                                                </div>
                                                {errors.roleTitle && <FieldError className="text-xs text-red-500">{errors.roleTitle}</FieldError>}
                                            </TextField>

                                            {/* 2. Work Type */}
                                            <div className="flex flex-col w-full gap-1.5">
                                                <Label className="text-sm font-medium text-gray-700">Work Type *</Label>
                                                <Select
                                                    name="workType"
                                                    placeholder="Select workspace setup"
                                                    defaultValue={opportunity.workType}
                                                    className="w-full"
                                                    aria-label="Work Type"

                                                >
                                                    <Select.Trigger className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-sm bg-white ${errors.workType ? 'border-red-500' : 'border-gray-300'}`}>
                                                        <div className="flex items-center gap-2">
                                                            <LaptopMinimal className="text-gray-400" size={16} />
                                                            <Select.Value />
                                                        </div>
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox aria-label="Work Type Options">
                                                            <ListBox.Item id="remote" textValue="Remote">Remote</ListBox.Item>
                                                            <ListBox.Item id="onsite" textValue="On-site">On-site</ListBox.Item>
                                                            <ListBox.Item id="hybrid" textValue="Hybrid">Hybrid</ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                                {errors.workType && <p className="text-xs text-red-500 mt-1">{errors.workType}</p>}
                                            </div>

                                            {/* 3. Conditional Location Field (Hides if remote) */}
                                            {opportunity.workType !== "remote" && (
                                                <TextField
                                                    name="location"
                                                    isRequired={opportunity.workType !== "" && opportunity.workType !== "remote"}
                                                    defaultValue={opportunity.location}
                                                    isInvalid={!!errors.location}
                                                    className="flex flex-col w-full gap-1.5 transition-all duration-200"
                                                >
                                                    <Label className="text-sm font-medium text-gray-700">Location</Label>
                                                    <div className="relative flex items-center">
                                                        <span className="absolute left-3 text-gray-400 z-10">
                                                            <MapPin width="16" />
                                                        </span>
                                                        <Input
                                                            name="location"
                                                            aria-label="Location"
                                                            placeholder="City, Country"
                                                            className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none"
                                                        />
                                                    </div>
                                                    {errors.location && <FieldError className="text-xs text-red-500">{errors.location}</FieldError>}
                                                </TextField>
                                            )}

                                            {/* 4. Commitment Level */}
                                            <div className="flex flex-col w-full gap-1.5">
                                                <Label className="text-sm font-medium text-gray-700">Commitment Level *</Label>
                                                <Select
                                                    name="commitment"
                                                    placeholder="Select commitment structure"
                                                    defaultValue={opportunity?.commitment}
                                                    className="w-full"
                                                    aria-label="Commitment Level"
                                                >
                                                    <Select.Trigger className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-sm bg-white ${errors.commitment ? 'border-red-500' : 'border-gray-300'}`}>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="text-gray-400" width="16" />
                                                            <Select.Value />
                                                        </div>
                                                        <Select.Indicator />
                                                    </Select.Trigger>
                                                    <Select.Popover>
                                                        <ListBox aria-label="Commitment Level Options">
                                                            <ListBox.Item id="full-time" textValue="Full-time">Full-time</ListBox.Item>
                                                            <ListBox.Item id="part-time" textValue="Part-time">Part-time</ListBox.Item>
                                                            <ListBox.Item id="contract" textValue="Contract">Contract</ListBox.Item>
                                                            <ListBox.Item id="internship" textValue="Internship">Internship</ListBox.Item>
                                                        </ListBox>
                                                    </Select.Popover>
                                                </Select>
                                                {errors.commitment && <p className="text-xs text-red-500 mt-1">{errors.commitment}</p>}
                                            </div>

                                            {/* Salary Range Fields */}
                                            <TextField isRequired defaultValue={opportunity.minSalary} isInvalid={!!errors.minSalary} className="flex flex-col w-full gap-1.5">
                                                <Label className="text-sm font-medium text-gray-700">Minimum Salary</Label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3 text-sm font-semibold text-gray-400 z-10">
                                                        $
                                                    </span>
                                                    <Input
                                                        type="number"
                                                        name="minSalary"
                                                        aria-label="Minimum Salary"
                                                        placeholder="45,000"
                                                        className="pl-8 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none"
                                                    />
                                                </div>
                                                {errors.minSalary && <FieldError className="text-xs text-red-500">{errors.minSalary}</FieldError>}
                                            </TextField>

                                            <TextField isRequired defaultValue={opportunity.maxSalary} isInvalid={!!errors.maxSalary} className="flex flex-col w-full gap-1.5">
                                                <Label className="text-sm font-medium text-gray-700">Maximum Salary</Label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3 text-sm font-semibold text-gray-400 z-10">
                                                        $
                                                    </span>
                                                    <Input
                                                        type="number"
                                                        name="maxSalary"
                                                        aria-label="Maximum Salary"
                                                        placeholder="80,000"
                                                        className="pl-8 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none"
                                                    />
                                                </div>
                                                {errors.maxSalary && <FieldError className="text-xs text-red-500">{errors.maxSalary}</FieldError>}
                                            </TextField>

                                            {/* 5. Application Deadline */}
                                            <TextField isRequired defaultValue={opportunity.deadline} isInvalid={!!errors.deadline} className="flex flex-col w-full gap-1.5">
                                                <Label className="text-sm font-medium text-gray-700">Deadline</Label>
                                                <div className="relative flex items-center">
                                                    <span className="absolute left-3 text-gray-400 z-10">
                                                        <Calendar width="16" />
                                                    </span>
                                                    <Input
                                                        type="date"
                                                        name="deadline"
                                                        aria-label="Application Deadline"
                                                        className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none"
                                                    />
                                                </div>
                                                {errors.deadline && <FieldError className="text-xs text-red-500">{errors.deadline}</FieldError>}
                                            </TextField>

                                        </div>

                                        {/* Full-Width Details Field */}
                                        <TextField isRequired defaultValue={opportunity.details} isInvalid={!!errors.details} className="flex flex-col w-full gap-1.5 mt-1">
                                            <Label className="text-sm font-medium text-gray-700">Opportunity Details</Label>
                                            <div className="relative flex items-start">
                                                <span className="absolute left-3 top-3 text-gray-400 z-10">
                                                    <FileText size={16} />
                                                </span>
                                                <TextArea
                                                    name="details"
                                                    aria-label="Opportunity Details"
                                                    placeholder="Provide a comprehensive description of the role, core responsibilities, and team culture..."
                                                    className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none min-h-[120px]"
                                                />
                                            </div>
                                            {errors.details && <FieldError className="text-xs text-red-500">{errors.details}</FieldError>}
                                        </TextField>

                                        {/* 6. Required Skills */}
                                        <TextField isRequired defaultValue={opportunity.requiredSkills} isInvalid={!!errors.requiredSkills} className="flex flex-col w-full gap-1.5 mt-1">
                                            <Label className="text-sm font-medium text-gray-700">Required Skills</Label>
                                            <div className="relative flex items-start">
                                                <span className="absolute left-3 top-3 text-gray-400 z-10">
                                                    <Folder width="16" />
                                                </span>
                                                <TextArea
                                                    name="requiredSkills"
                                                    aria-label="Required Skills"
                                                    placeholder="Tell us about the target stack, preferred certifications, tools, etc..."
                                                    className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none min-h-[100px]"
                                                />
                                            </div>
                                            {errors.requiredSkills && <FieldError className="text-xs text-red-500">{errors.requiredSkills}</FieldError>}
                                        </TextField>

                                        {/* Footer Action buttons */}
                                        <div className="flex items-center justify-end gap-3 mt-4 pt-5 border-t border-gray-200 w-full">
                                            <Button
                                                slot="close"
                                                type="close"
                                                className="font-semibold text-gray-700 border border-gray-300 rounded-lg px-5 bg-white hover:bg-gray-50"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                slot="close"
                                                type="submit"
                                                className="bg-gray-900 text-white font-semibold rounded-lg px-6 hover:bg-gray-800 transition-colors"
                                            >
                                                Update Opportunity
                                            </Button>
                                        </div>

                                    </Fieldset>
                                </Form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateOpportunityModal;