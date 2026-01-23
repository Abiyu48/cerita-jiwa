const Input = ({ 
  label, 
  error, 
  className = '', 
  type = 'text',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-white/70 backdrop-blur-sm ${
          error 
            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' 
            : 'border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;