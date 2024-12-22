import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { register } from '@/services/auth-service';
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
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { paths } from '@/config/paths';

const registerSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const { toast } = useToast();
    const navigate = useNavigate(); // Moved outside the handleRegister function

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const handleRegister = async (data: RegisterFormData) => {
        const error = await register(data.email, data.password, data.username);

        if (error) {
            toast({ title: 'Registration Error', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Success', description: 'You may now log in to your account.' });
            navigate(paths.auth.login.getHref()); // Fixed: Call navigate from the hook defined at the top level
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            Register
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already have an account?{' '}
                        <Link to={paths.auth.login.getHref()}>
                            <Button variant="link">
                                Login here
                            </Button>
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Register;
