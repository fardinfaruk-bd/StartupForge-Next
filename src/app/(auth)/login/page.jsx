"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Button,
    Label,
    Form,
    TextField,
    Input,
    FieldError,
    InputGroup,
    Card
} from "@heroui/react";
import { At, Eye, EyeSlash, ShieldKeyhole } from "@gravity-ui/icons";
import AuthLeftUi from "@/components/ui/AuthLeftUi";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const formRef = useRef(null);

    // Form Controlled States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const { data, error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
                return;
            }

            // --- Form Reset Logic on Success ---
            setEmail("");
            setPassword("");

            setSuccess("Successfully signed in! Redirecting...");
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

    const handleGoogleLogin = async () => {
        const data = await signIn.social({
            provider: "google",
        });

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
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Welcome back</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your credentials to access your account</p>
                    </div>

                    {/* HeroUI Custom Form Wrapper Component */}
                    <Form ref={formRef} onSubmit={handleLogin} className="flex flex-col gap-5">

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
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-800 focus-within:border-primary transition-colors w-full">
                                <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                                <Input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Enter your password"
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

                        {/* Dynamic Backend Status Messages */}
                        {error && (
                            <div className="p-3 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                                <span className="font-semibold">Error:</span> {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                                <span className="font-semibold">Success:</span> {success}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full font-semibold rounded-xl text-sm h-12 shadow-sm"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                        >
                            Sign In
                        </Button>
                        <Button variant="outline" className="w-full font-semibold rounded-xl text-sm h-12 shadow-sm" onClick={handleGoogleLogin}>
                            <FcGoogle />
                            Sign Up with Google
                        </Button>

                        {/* Navigation Footer links */}
                        <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Don&apos;t have an account?{" "}
                            <Link href={`/register?redirect=${redirectTo}`} className="font-semibold cursor-pointer text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                Sign up instead
                            </Link>
                        </div>

                    </Form>
                </Card>
            </div>

        </div>
    );
}