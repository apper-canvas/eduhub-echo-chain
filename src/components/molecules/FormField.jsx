import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
const FormField = ({
  label, 
  type = "text", 
  error, 
  required = false,
  options = [],
  className = "",
  ...props 
}) => {
// Rating Component
  const Rating = ({ value, onChange, max = 5, ...props }) => {
    const [hoverValue, setHoverValue] = React.useState(0);
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className={`p-1 transition-colors ${
                starValue <= (hoverValue || value)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onClick={() => onChange?.(starValue)}
              onMouseEnter={() => setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(0)}
              {...props}
            >
              <ApperIcon name="Star" className="w-6 h-6 fill-current" />
            </button>
          );
        })}
        {value && (
          <span className="ml-2 text-sm text-gray-600">
            {value}/{max}
          </span>
        )}
      </div>
    );
  };

  // Radio Component
  const Radio = ({ value, onChange, options = [], name, ...props }) => {
    return (
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2"
              {...props}
            />
            <span className="text-sm font-medium text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  };

  const Component = type === "select" ? Select : Input;
  
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
{type === "select" ? (
        <Select error={error} {...props}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : type === "rating" ? (
        <Rating error={error} {...props} />
      ) : type === "radio" ? (
        <Radio options={options} error={error} {...props} />
      ) : (
        <Component type={type} error={error} {...props} />
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;