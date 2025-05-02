export function Box({h, w, children, className = '', padding = 'p-5', margin = 'm-5'}) {
    const width = w ? `w-${w}` : 'w-full';
    const height = h ? `h-${h}` : 'h-full';

    return (
            <div className={`${margin} ${padding} ${width} ${height} rounded border border-gray-200 shadow-sm transition-discrete ${className}`}>
                {children}
            </div>
    )
    
}