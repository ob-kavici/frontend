import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
    queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60,
    },
} satisfies DefaultOptions;

// Generic type for API function return type
export type ApiFnReturnType<FnType extends (...args: unknown[]) => Promise<unknown>> =
    Awaited<ReturnType<FnType>>;

// Generic type for query configuration
export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
    ReturnType<T>,
    'queryKey' | 'queryFn'
>;

// Generic type for mutation configuration
export type MutationConfig<
    MutationFnType extends (...args: unknown[]) => Promise<unknown>
> = UseMutationOptions<
    ApiFnReturnType<MutationFnType>, // Resolved return type
    Error, // Error type
    Parameters<MutationFnType>[0] // Input type for the mutation function
>;
