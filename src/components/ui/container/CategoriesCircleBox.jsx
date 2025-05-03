export function CategoriesCircleBox({h, w, children, className = '', padding = 'p-5',margin = 'm-5',color=""}) {
    const Width = w ? `w-${w}` : 'w-100';
    const Height = h ? `h-${h}` : 'h-100';

    return (
            <div className={`${margin} ${padding} ${Width} ${Height} rounded-full bg-${color}-300 border border-gray-200 shadow-sm ${className}`}>
                {children}
            </div>
    )
    
}