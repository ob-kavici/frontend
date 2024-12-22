import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/services/auth-service';
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
import { paths } from '@/config/paths';

const loginSchema = z.object({
    identifier: z.string().min(3, { message: 'Identifier must be at least 3 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const handleLogin = async (data: LoginFormData) => {
        const error = await login(data.identifier, data.password);
        if (error) {
            toast({ title: 'Login Error', description: 'Invalid credentials', variant: 'destructive' });
        } else {
            toast({ title: 'Success', description: `Welcome, ${data.identifier}!` });
            navigate(paths.games.root.getHref(), { replace: true });
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username or email" {...field} />
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
                            Login
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Don't have an account?{' '}
                        <Link to={paths.auth.register.getHref()}>
                            <Button variant="link">
                                Register here
                            </Button>
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
