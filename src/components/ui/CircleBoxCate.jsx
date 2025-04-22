export function CircleBoxCate({h, w, children, className = '', padding = 'p-5',margin = 'm-5',color=""}) {
    const maxWidth = w ? `max-w-${w}` : 'max-w-100';
    const maxHeight = h ? `max-h-${h}` : 'max-h-100';

    return (
            <div className={`${margin} ${padding} ${maxWidth} ${maxHeight} rounded-full bg-${color}-200 border border-gray-200 shadow-sm ${className}`}>
                {children}
            </div>
    )
    
}