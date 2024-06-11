import { useEffect } from 'react';

const useClassObserver = (classesToWatch, onClassesMatch) => {
  useEffect(() => {
    const targetNode = document.body;

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const classList = targetNode.classList;
          const hasAllClasses = classesToWatch.every((cls) =>
            classList.contains(cls)
          );
          if (hasAllClasses) {
            onClassesMatch();
          }
        }
      }
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [classesToWatch, onClassesMatch]);
};

export default useClassObserver;
