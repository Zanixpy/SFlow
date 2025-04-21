export function CircleBoxCate({h, w, children, className = '', padding = 'p-5',margin = 'm-5',color=""}) {
    const maxWidth = w ? `max-w-[${w}px]` : 'max-w-100';
    const maxHeight = h ? `max-h-[${h}px]` : 'max-h-100';

    return (
            <div className={`${margin} ${padding} ${maxWidth} ${maxHeight} rounded-full border border-${color}-200 shadow-sm ${className}`}>
                {children}
            </div>
    )
    
}