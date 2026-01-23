const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl focus:ring-primary-300',
    secondary: 'bg-sage-100 hover:bg-sage-200 text-sage-700 focus:ring-sage-300',
    outline: 'border-2 border-primary-300 text-primary-600 hover:bg-primary-50 focus:ring-primary-300',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;