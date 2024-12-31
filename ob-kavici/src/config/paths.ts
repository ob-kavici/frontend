export const paths = {
    home: {
        path: '/',
        getHref: () => '/',
    },

    auth: {
        path: '/auth',
        getHref: () => '/auth',
        register: {
            path: '/auth/register',
            getHref: (redirectTo?: string | null | undefined) =>
                `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
        },
        login: {
            path: '/auth/login',
            getHref: (redirectTo?: string | null | undefined) =>
                `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
        forgotPassword: {
            path: '/auth/forgot-password',
            getHref: () => '/auth/forgot-password',
        },
    },

    profile: {
        path: '/profile',
        getHref: () => '/profile',
    },

    games: {
        root: {
            path: '/games',
            getHref: () => '/games',
        },
        gameHome: {
            path: '/games/:gameTypeId',
            getHref: (gameType: string) => `/games/${gameType}`,
        },
        game: {
            path: '/games/:gameTypeId/:gameId',
            getHref: (gameType: string, gameId: string) => `/games/${gameType}/${gameId}`,
        },
    },
} as const;