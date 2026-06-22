"use client";

import { useState } from "react";
import { Envelope } from "@gravity-ui/icons";
import { Loader2 } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField, TextArea } from "@heroui/react";
import { toast } from "react-toastify";
import { ApplyApplication } from "@/lib/actions/applications";
import { redirect } from "next/navigation";

export function ApplyModal({ opportunity, isClosed, user }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    
    if(!user){
        redirect(`/login?redirect=/opportunities/${opportunity._id}`);
    }

    if(user.role === "founder"){
        return (
            <div className="flex items-center justify-center ">
                <p className="animate-pulse text-rose-500">Founder can not apply for Opportunity.</p>
            </div>
        );
    }
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create FormData from the active native form element
            const formData = new FormData(e.currentTarget);

            // Extract custom element values using field names
            const email = formData.get("applicant_email");
            const portfolioLink = formData.get("portfolio_link");
            const motivation = formData.get("motivation_message");

            // Simple validation check before logging
            if (!email || !portfolioLink || !motivation) {
                alert("Please ensure all application fields are filled correctly.");
                setIsSubmitting(false);
                return;
            }

            const formattedData = {
                Applicant_email: email,
                Portfolio_link: portfolioLink,
                applicantId: user.id,
                startupName: opportunity.startupName,
                startupId: opportunity.startupId,
                roleTitle: opportunity.roleTitle,
                Motivation: motivation,
                Status: "Pending",
                OpportunityId: opportunity._id
            }

            const res = await ApplyApplication(formattedData)
            
            if(res.insertedId){
                toast.success(`Application for ${opportunity.roleTitle} submitted successfully!`);
                
            }
            

            // Clean up fields on the active form layout
            e.target.reset();
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button variant="primary"
                slot="close"
                color="primary"
                disabled={isClosed}
                className={`w-full font-semibold flex bg-purple-600 items-center justify-center gap-2 py-6 text-md ${isClosed ? 'opacity-50 pointer-events-none' : ''
                    }`}>
                Apply for this Opportunity
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Apply for Opportunity</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and we will get back to you. The modal adapts automatically
                                when the keyboard appears on mobile.
                            </p>
                        </Modal.Header>

                        {/* The form elements wrap the body to bind submit actions natively */}
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <Modal.Body className="p-6">
                                <Surface variant="default" className="border-0 p-0 shadow-none">
                                    <div className="flex flex-col gap-4">

                                        {/* Applicant Email Field */}
                                        <TextField className="w-full" defaultValue={user?.email} name="applicant_email" type="email" variant="secondary">
                                            <Label>Applicant Email</Label>
                                            <Input
                                                placeholder="Enter your email"
                                                required
                                                readOnly
                                            />
                                        </TextField>

                                        {/* Portfolio Link Field */}
                                        <TextField className="w-full" name="portfolio_link" type="url" variant="secondary">
                                            <Label>Portfolio Link</Label>
                                            <Input
                                                placeholder="Enter your portfolio URL"
                                                required
                                            />
                                        </TextField>

                                        {/* Motivation Message Field */}
                                        <div className="flex flex-col gap-1.5 w-full">
                                            <Label className="text-sm font-medium">Motivation Message</Label>
                                            <TextArea
                                                name="motivation_message"
                                                placeholder="Enter your message"
                                                required
                                                className="w-full min-h-25 text-sm p-2 rounded-md border border-input bg-background"
                                            />
                                        </div>

                                    </div>
                                </Surface>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button slot="close" variant="secondary" type="button" disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button slot="close" type="submit" disabled={isSubmitting} className="min-w-30">
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-1.5">
                                            <Loader2 className="animate-spin size-4" />
                                            Sending...
                                        </span>
                                    ) : (
                                        "Apply"
                                    )}
                                </Button>
                            </Modal.Footer>
                        </form>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}