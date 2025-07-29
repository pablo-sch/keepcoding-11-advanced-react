import React, { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { error: Error | null; info: unknown }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null as Error | null,
      info: null as unknown,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({ error, info: errorInfo });
  }

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
