interface ApiResponse<T> {
    data: T;
    error?: string;
}

const defaultOptions: Partial<RequestInit> = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

export async function fetchApi<T>(url: string, options?: Partial<RequestInit>): Promise<ApiResponse<T>> {
    const finalOptions: RequestInit = {
        ...defaultOptions,
        ...options,
    };

    try {
        const response = await fetch(url, finalOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.body === null || response.body === undefined) {
            return { data: null as unknown as T };
        }

        const data: T = await response.json();

        return { data };
    } catch (error) {
        console.error('Error retrieving data:', error);
        return { data: null as unknown as T, error: 'Error retrieving data' };
    }
}
