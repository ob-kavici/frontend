import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { login, register } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const authSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type AuthFormData = z.infer<typeof authSchema>;

const AuthPage: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleAuth = async (data: AuthFormData) => {
        let error;
        if (isRegistering) {
            error = await register(data.email, data.password);
            if (error) {
                toast({ title: 'Registration Error', description: error.message, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: 'You may now login to your account.' });
                form.reset();
                setIsRegistering(false);
            }
        } else {
            error = await login(data.email, data.password);
            if (error) {
                toast({ title: 'Login Error', description: error.message, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: 'You are now logged in.' });
                navigate('/');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        {isRegistering ? 'Register' : 'Login'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {isRegistering ? 'Register' : 'Login'}
                            </Button>
                        </form>
                    </Form>
                    <div className="text-center mt-4">
                        {isRegistering ? (
                            <p>
                                Already have an account?{' '}
                                <Button variant="link" onClick={() => setIsRegistering(false)}>
                                    Login here
                                </Button>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{' '}
                                <Button variant="link" onClick={() => setIsRegistering(true)}>
                                    Register here
                                </Button>
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthPage;
