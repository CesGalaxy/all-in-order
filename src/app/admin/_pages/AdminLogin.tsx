"use client";

import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import React from "react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { IconBrandGithub, IconBrandGoogle, IconEye, IconEyeOff } from "@tabler/icons-react";
import Image from "next/image";
import NameCol from "@/assets/logo/NameCol.svg";

// TODO: Make this the login screen for the whole app
export default function AdminLogin() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("What are you trying? Bro, go away!");
    };

    return (
        <div className="flex h-full w-full items-center justify-center flex-grow bg-background text-foreground">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
                <div className="flex flex-col items-center pb-6">
                    <Image src={NameCol} alt="All In Order" width={256}/>
                    <p className="text-xl font-medium">Welcome Back</p>
                    <p className="text-small text-default-500">Log in to your account to continue</p>
                </div>
                <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        label="Email Address"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? <IconEyeOff/> : <IconEye/>}
                            </button>
                        }
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <div className="flex w-full items-center justify-between px-1 py-2">
                        <Checkbox name="remember" size="sm">
                            Remember me
                        </Checkbox>
                        <Link className="text-default-500" href="#" size="sm">
                            Forgot password?
                        </Link>
                    </div>
                    <Button className="w-full" color="primary" type="submit">
                        Sign In
                    </Button>
                </Form>
                <div className="flex items-center gap-4 py-2">
                    <Divider className="flex-1"/>
                    <p className="shrink-0 text-tiny text-default-500">OR</p>
                    <Divider className="flex-1"/>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        startContent={<IconBrandGoogle/>}
                        variant="bordered"
                    >
                        Continue with Google
                    </Button>
                    <Button
                        startContent={<IconBrandGithub/>}
                        variant="bordered"
                    >
                        Continue with Github
                    </Button>
                </div>
                <p className="text-center text-small">
                    Need to create an account?&nbsp;
                    <Link href="#" size="sm">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
