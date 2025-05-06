export function Box({h, w, children, className = '', padding = 'p-5', margin = 'm-5'}) {
    const width = w ? `w-${w} ` : 'w-full';
    const height = h ? `h-${h} ` : 'h-full';

    return (<div className={`${margin} ${padding} ${width} ${height} max-w-${w} max-h-${h} transition-discrete ${className}`}>
                {children}
            </div>
        )
}