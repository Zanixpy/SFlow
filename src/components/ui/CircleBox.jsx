export function CircleBox({h, w, children, className = '', padding = 'p-5', margin = 'm-5'}) {
    const maxWidth = w ? `max-w-[${w}px]` : 'max-w-100';
    const maxHeight = h ? `max-h-[${h}px]` : 'max-h-100';

    return (
            <div className={`${margin} ${padding} ${maxWidth} ${maxHeight} rounded-full border border-gray-200 shadow-sm ${className}`}>
                {children}
            </div>
    )
    
}