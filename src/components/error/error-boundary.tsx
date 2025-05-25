import React, { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { error: Error | null; info: unknown }> {
  /* class ErrorBoundary extends React.Component<React.PropsWithChildren> {*/
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null as Error | null,
      info: null as unknown,
    };
  }

  /*
    state = {
    hasError: false,
    error: null as Error | null,
    }; 
    */

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({ error, info: errorInfo });
  }

  /*   render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
  } */

  render() {
    const { error, info } = this.state;
    if (!error) {
      return this.props.children;
    }
    return (
      <div className="error-boundary">
        <h1>Something went wrong.</h1>
        <p>{error.message}</p>
        <div>
          <code>{JSON.stringify(info)}</code>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
