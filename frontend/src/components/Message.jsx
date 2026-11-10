import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Message = ({ variant = 'info', children, className = '' }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    danger: 'bg-rose-50 border-rose-200 text-rose-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  const icons = {
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
    danger: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
  };

  return (
    <div
      className={`border rounded-xl p-4 flex items-center gap-3 text-sm font-medium ${
        styles[variant] || styles.info
      } ${className}`}
    >
      {icons[variant] || icons.info}
      <div>{children}</div>
    </div>
  );
};

export default Message;

