import { forwardRef } from 'react';

const Card = forwardRef(({ children, className = '', as: Component = 'div', ...props }, ref) => {
  return (
    <Component ref={ref} className={`card ${className}`} {...props}>
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export default Card;
