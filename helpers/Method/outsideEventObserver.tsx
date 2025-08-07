"use client"; // Ensure client-side execution
 
import { useEffect } from "react";
 
interface EventGroup {
  eventTypes: (keyof DocumentEventMap)[];
  excludedSelectors?: string[];
  onEventOutside?: (event: Event) => void;
}
 
interface OutsideEventObserverProps {
  eventGroups: EventGroup[];
}
 
const OutsideEventObserver: React.FC<OutsideEventObserverProps> = ({ eventGroups }) => {
  useEffect(() => {
    const handlers: { [key: string]: (event: Event) => void } = {};
 
    eventGroups.forEach(({ eventTypes, excludedSelectors = [], onEventOutside }) => {
      const handleEventOutside = (event: Event) => {
        const target = event.target as HTMLElement;
 
        // Check if the clicked element matches any of the excluded selectors
        const isExcluded = excludedSelectors.some((selector) =>
          target.closest(selector)
        );
 
        if (!isExcluded) {
          console.log(`Event "${event.type}" outside the specified elements:`, target);
          if (onEventOutside) onEventOutside(event);
        }
      };
 
      eventTypes.forEach((eventType) => {
        // Store the handler for cleanup
        handlers[eventType] = handleEventOutside;
 
        // Attach the event listener to the initial document
        document.addEventListener(eventType, handleEventOutside);
 
        // Create a MutationObserver to detect added elements
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                // Attach the event listener to the new element
                node.addEventListener(eventType, handleEventOutside);
              }
            });
          });
        });
 
        // Start observing the entire document for added nodes
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    });
 
    // Cleanup on unmount
    return () => {
      Object.keys(handlers).forEach((eventType) => {
        document.removeEventListener(eventType, handlers[eventType]);
      });
    };
  }, [eventGroups]);
 
  return null; // This component does not render anything
};
 
export default OutsideEventObserver;
 
 