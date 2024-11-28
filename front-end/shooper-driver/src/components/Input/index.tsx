import React, { forwardRef } from 'react';



type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, value, placeholder, ...restProps }, ref) => {
    
   

    return (
      <>
        <input
          {...restProps}
          ref={ref} // Passando a ref corretamente
          onChange={onChange}
          value={value ?? ""}
          placeholder={placeholder}
          id='origin-list'
        />
        
      </>
    );
  }
);

// Nome opcional para depuração
Input.displayName = "Input";
