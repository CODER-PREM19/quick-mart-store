const Loader = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;

