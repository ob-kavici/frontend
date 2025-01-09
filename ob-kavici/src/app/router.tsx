import { paths } from "@/config/paths";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"


const convert = (queryClient: QueryClient) => (m: any) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
        ...rest,
        loader: clientLoader?.(queryClient),
        action: clientAction?.(queryClient),
        Component,
    };
};

export const createAppRouter = (queryClient: QueryClient) => {
    return createBrowserRouter([
        {
            path: paths.home.path,
            lazy: () => import('./routes/landing').then(convert(queryClient)),
        },
        {
            path: paths.auth.getHref(),
            loader: async () => {
                return redirect(paths.auth.login.getHref());
            },
        },
        {
            path: paths.auth.register.path,
            lazy: () => import('./routes/auth/register').then(convert(queryClient)),
        },
        {
            path: paths.auth.login.path,
            lazy: () => import('./routes/auth/login').then(convert(queryClient)),
        },
        {
            path: paths.auth.forgotPassword.path,
            lazy: () => import('./routes/auth/forgot-password').then(convert(queryClient)),
        },
        {
            path: paths.profile.root.path,
            lazy: () => import('./routes/profile/profile').then(convert(queryClient)),
        },
        {
            path: paths.profile.editor.path,
            lazy: () => import('./routes/profile/editor-profile').then(convert(queryClient)),
        },
        {
            path: paths.games.root.path,
            lazy: () => import('./routes/games/games-home').then(convert(queryClient)),
        },
        {
            path: paths.games.gameHome.path,
            lazy: () => import('./routes/games/game-overview').then(convert(queryClient)),
        },
        {
            path: paths.games.game.path,
            lazy: () => import('./routes/games/game').then(convert(queryClient)),
        },
    ]);
}

export const AppRouter = () => {
    const queryClient = useQueryClient();

    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />
};