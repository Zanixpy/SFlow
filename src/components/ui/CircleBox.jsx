export function CircleBox({h, w, children, className = '', padding = 'p-5', margin = 'm-5'}) {
    const width = w ? `w-${w}` : 'w-100';
    const height = h ? `h-${h}` : 'h-100';

    return (
            <div className={`${margin} ${padding} ${width} ${height} rounded-full border border-gray-200 shadow-sm ${className}`}>
                {children}
            </div>
    )
    
}