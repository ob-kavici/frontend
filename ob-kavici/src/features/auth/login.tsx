import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/lib/hooks/use-toast';
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
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
    identifier: z.string().min(3, { message: 'Uporabniško ime mora vsebovati vsaj 3 znake' }),
    password: z.string().min(6, { message: 'Geslo mora vsebovati vsaj 6 znakov' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [showPassword, setShowPassword] = useState(false);

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
            toast({ title: 'Napaka ob prijavi', description: 'Neveljavni podatki', variant: 'destructive' });
        } else {
            toast({ title: 'Prijava uspešna', description: `Živijo, ${data.identifier}!` });
            navigate(paths.games.root.getHref(), { replace: true });
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Prijava</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Uporabniško ime ali Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Vnesite vaše uporabniško ime ali email" {...field} />
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
                                                placeholder="Vnesite vaše geslo"
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
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            Prijava
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Še nimate računa?{' '}
                        <Link to={paths.auth.register.getHref()}>
                            <Button variant="link">
                                Registrirajte se tukaj
                            </Button>
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
