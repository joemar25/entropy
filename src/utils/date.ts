export function formatDateTime(isoString: string): string {
    const date = new Date(isoString)

    // Format: 'Jan 1, 2024, 14:30'
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
} 