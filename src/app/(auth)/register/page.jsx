"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- FIXED: Added missing import
import { useRouter, useSearchParams } from "next/navigation";
import {
    Button,
    RadioGroup,
    Radio,
    Label,
    Description,
    Form,
    TextField,
    Input,
    FieldError,
    InputGroup,
    Card
} from "@heroui/react";
import { Person, At, Eye, EyeSlash, Camera, ShieldKeyhole } from "@gravity-ui/icons";
import AuthLeftUi from "@/components/ui/AuthLeftUi";
import { toast } from "react-toastify";
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const fileInputRef = useRef(null);
    const formRef = useRef(null);

    // Form Controlled States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("contributor");

    // Image States
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Handle local file selection with 5MB validation
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setError("");

        if (file) {
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                setError("Image size must be smaller than 5MB.");
                setImageFile(null);
                setImagePreview("");
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        let uploadedImageUrl = "";

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

                const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                    method: "POST",
                    body: formData,
                });

                const imgbbData = await imgbbResponse.json();

                if (imgbbData.success) {
                    uploadedImageUrl = imgbbData.data.url;
                } else {
                    throw new Error("Avatar upload failed. Please try a different image.");
                }
            }

            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                image: uploadedImageUrl || undefined,
                role
            });

            if (authError) {
                setError(authError.message || "Something went wrong. Please try again.");
                return;
            }

            // --- Form Reset Logic on Success ---
            setName("");
            setEmail("");
            setPassword("");
            setRole("contributor");
            setImageFile(null);
            setImagePreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";

            if (data) {
                toast.success(`Account registered as ${role}! Successfully`);
            }
            setTimeout(() => {
                router.push(redirectTo || "/");
            }, 1000);

        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">

            {/* LEFT SIDE: Premium Decorative Panel */}
            <AuthLeftUi />

            {/* RIGHT SIDE: Interactive Form Flow */}
            <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
                <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">

                    {/* Header Container */}
                    <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                    </div>

                    {/* HeroUI Custom Form Wrapper Component */}
                    <Form ref={formRef} onSubmit={handleSignup} className="flex flex-col gap-5">

                        {/* Interactive Image Upload Preview */}
                        <div className="flex flex-col items-center justify-center gap-2 mb-2 w-full">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="group relative h-20 w-20 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center transition-all hover:border-primary"
                            >
                                {imagePreview ? (
                                    <>
                                        {/* FIXED: Using next/image requires unoptimized for objectURLs or alternative config, or a simple standard img tag. */}
                                        <Image src={imagePreview} alt="Avatar Preview" fill className="h-full w-full object-cover" unoptimized />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="text-white text-lg" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                                        <Camera className="text-xl mb-0.5" />
                                        <span className="text-[9px] font-medium">Add Photo</span>
                                    </div>
                                )}
                            </div>
                            <small>Max Size: 5 MB</small>
                            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                        </div>

                        {/* Name Field */}
                        <TextField isRequired name="name" className="flex flex-col gap-1.5 w-full">
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800 focus-within:border-primary transition-colors w-full">
                                <Person className="text-zinc-400 pointer-events-none" size={16} />
                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100 focus:ring-0"
                                />
                            </InputGroup>
                            <FieldError className="text-xs text-red-500 font-medium" />
                        </TextField>

                        {/* Email Field with Regex Validation */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="flex flex-col gap-1.5 w-full"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800 focus-within:border-primary transition-colors w-full">
                                <At className="text-zinc-400 pointer-events-none" size={16} />
                                <Input
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100 focus:ring-0"
                                />
                            </InputGroup>
                            <FieldError className="text-xs text-red-500 font-medium" />
                        </TextField>

                        {/* Password Field with Validation Checks */}
                        <TextField
                            isRequired
                            name="password"
                            className="flex flex-col gap-1.5 w-full"
                            validate={(value) => {
                                if (value.length < 8) return "Password must be at least 8 characters";
                                if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
                                if (!/[0-9]/.test(value)) return "Password must contain a number";
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800 focus-within:border-primary transition-colors w-full">
                                <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                                <Input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Choose a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100 focus:ring-0"
                                />
                                <button
                                    className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </button>
                            </InputGroup>
                            <FieldError className="text-xs text-red-500 font-medium" />
                        </TextField>

                        {/*  Role Selector */}
                        <div className="flex flex-col gap-2 w-full">
                            <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Select Your Role</Label>
                            <RadioGroup
                                value={role}
                                onValueChange={setRole}
                                name="role"
                                orientation="horizontal "
                                classNames={{
                                    wrapper: "grid grid-cols-2 gap-4 w-full"
                                }}
                            >
                                <Radio
                                    value="contributor"
                                    onClick={() => setRole("contributor")} // <-- Forces state change on card click
                                    classNames={{
                                        base: "inline-flex m-0 bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 items-start justify-start cursor-pointer rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 max-w-full data-[selected=true]:border-indigo-500 data-[selected=true]:bg-indigo-50/10 dark:data-[selected=true]:bg-indigo-950/10 transition-all",
                                        labelWrapper: "w-full flex flex-col gap-1"
                                    }}
                                >
                                    <Radio.Content className="flex items-center gap-2 font-bold text-sm text-zinc-800 dark:text-zinc-200">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        Contributor
                                    </Radio.Content>
                                    <Description className="text-xs text-zinc-500 mt-1 pl-5">Those who want to get opportunities</Description>
                                </Radio>

                                <Radio
                                    value="founder"
                                    onClick={() => setRole("founder")} // <-- Forces state change on card click
                                    classNames={{
                                        base: "inline-flex m-0 bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 items-start justify-start cursor-pointer rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 max-w-full data-[selected=true]:border-indigo-500 data-[selected=true]:bg-indigo-50/10 dark:data-[selected=true]:bg-indigo-950/10 transition-all",
                                        labelWrapper: "w-full flex flex-col gap-1"
                                    }}
                                >
                                    <Radio.Content className="flex items-center gap-2 font-bold text-sm text-zinc-800 dark:text-zinc-200">
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        Founder
                                    </Radio.Content>
                                    <Description className="text-xs text-zinc-500 mt-1 pl-5">Those who want to create their own startup</Description>
                                </Radio>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full font-semibold rounded-xl text-sm h-12 shadow-sm"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                        >
                            Sign Up
                        </Button>

                        {/* Navigation Footer links */}
                        <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Already have an account?{" "}
                            <Link href={`/login?redirect=${redirectTo}`} className="font-semibold cursor-pointer text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                Sign in instead
                            </Link>
                        </div>

                    </Form>
                </Card>
            </div>

        </div>
    );
}