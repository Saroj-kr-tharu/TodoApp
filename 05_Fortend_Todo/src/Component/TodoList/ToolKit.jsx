import { useState } from "react";

const Tooltip = ({ children, text }) => {
    const [isVisible, setIsVisible] = useState(false);
    
  
    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {children}
        </div>
        {isVisible && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded whitespace-nowrap">
            {text}
          </div>
        )}
      </div>
    );
  };

  export default Tooltip;