import React from 'react';

export type Props = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export default function Content({ children, actions }: Props) {
  return (
    <main
      className="main__content-well flex-1 relative z-0 overflow-hidden focus:outline-none"
      style={{ padding: '12px', paddingLeft: '0' }}
    >
      {/* Content wrapper with Intercom module styling */}
      <div
        className="app-route-container h-full overflow-hidden"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full overflow-y-auto">
          <div className="py-4 pb-[12em]">
            {children}
            {actions && actions}
          </div>
        </div>
      </div>
    </main>
  );
}

