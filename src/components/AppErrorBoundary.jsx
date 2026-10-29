import React from 'react';

/**
 * Top-level application error boundary that catches unhandled UI exceptions
 * and provides a graceful recovery screen with brand aesthetics.
 */
export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, errorInfo) {
    console.error('Recovered from UI error:', err, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink text-sand flex flex-col items-center justify-center p-8 text-center">
          <p className="font-mono text-xs text-lime uppercase tracking-widest mb-3">
            AURA RUNTIME RECOVERY
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl mb-6">
            View refreshed.
          </h2>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-6 py-3 rounded-full bg-lime text-ink font-bold cursor-pointer hover:bg-lime/90 transition-colors"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;

