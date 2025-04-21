export function Box({h, w, children, className = '', padding = 'p-5', margin = 'm-5'}) {
    const maxWidth = w ? `max-w-${w}` : 'max-w-full';
    const maxHeight = h ? `max-h${h}` : 'max-h-full';

    return (
            <div className={`${margin} ${padding} ${maxWidth} ${maxHeight} rounded border border-gray-200 shadow-sm ${className}`}>
                {children}
            </div>
    )
    
}