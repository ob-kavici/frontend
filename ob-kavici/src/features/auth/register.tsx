import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/lib/hooks/use-toast';
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
import { Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
    username: z.string().min(3, { message: 'Uporabniško ime mora vsebovati vsaj 3 znake' }),
    email: z.string().email({ message: 'Neveljaven email' }),
    password: z.string().min(6, { message: 'Geslo mora vsebovati vsaj 6 znakov' }),
    confirmPassword: z.string().min(6, { message: 'Geslo mora vsebovati vsaj 6 znakov' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Gesli se ne ujemata',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleRegister = async (data: RegisterFormData) => {
        const error = await register(data.email, data.password, data.username);

        if (error) {
            toast({ title: 'Napaka ob registraciji', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Registracija uspešna', description: 'Sedaj se lahko prijavite v vaš račun.' });
            navigate(paths.auth.login.getHref());
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Registracija</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Uporabniško ime</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Vnesite vaše uporabniško ime" {...field} />
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
                                        <Input placeholder="Vnesite vaš email" {...field} />
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
                                    <FormLabel>Geslo</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Vensite vaše geslo"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-3 flex items-center"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Potrdi geslo</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Ponovno vnesite vaše geslo"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-3 flex items-center"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            Registriraj
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Že imate račun?{' '}
                        <Link to={paths.auth.login.getHref()}>
                            <Button variant="link">
                                Prijavite se tukaj
                            </Button>
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Register;
