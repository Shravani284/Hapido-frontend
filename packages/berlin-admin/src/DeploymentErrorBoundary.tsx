import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class DeploymentErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // console.error('Error boundary caught an error:', error, errorInfo);
    if (
      error.message.includes(
        'Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec'
      ) ||
      error.message.includes(
        // 'TypeError: Failed to fetch dynamically imported module'
        'assets/index-'
      )
    ) {
      window.location.reload();
    }
    // else {
    //   console.log('Error does not match conditions for reloading.');
    // }
  }

  render() {
    if (this.state.hasError) {
      //   window.location.reload();
      // return <h1>Something went wrong. Reloading the page...</h1>
      return;
    }

    return this.props.children;
  }
}

export default DeploymentErrorBoundary;
