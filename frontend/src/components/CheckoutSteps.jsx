import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: 'Sign In', active: step1, link: '/login' },
    { name: 'Shipping', active: step2, link: '/shipping' },
    { name: 'Payment', active: step3, link: '/payment' },
    { name: 'Place Order', active: step4, link: '/placeorder' },
  ];

  return (
    <div className="flex items-center justify-center max-w-2xl mx-auto my-6 px-4">
      {steps.map((step, idx) => (
        <div key={step.name} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step.active
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step.active ? idx + 1 : idx + 1}
            </div>
            <span
              className={`text-xs mt-1.5 font-semibold ${
                step.active ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              {step.name}
            </span>
          </div>

          {idx < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mx-2 -mt-5 transition-colors ${
                steps[idx + 1].active ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;

