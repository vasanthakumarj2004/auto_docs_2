import React from 'react';

export function StaticRedirect({ to }: { to: string }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
        <link rel="canonical" href={`https://docsynecx.com${to}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('${to}');`,
          }}
        />
      </head>
      <p>
        Redirecting to <a href={to}>{to}</a>...
      </p>
    </div>
  );
}
