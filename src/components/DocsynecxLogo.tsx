import React from 'react';

export interface DocsynecxLogoProps {
  className?: string;
  variant?: 'header' | 'footer';
  alt?: string;
}

export const DocsynecxLogo: React.FC<DocsynecxLogoProps> = ({
  className = 'h-8 sm:h-9 w-auto',
  variant = 'header',
  alt = 'Docsynecx Logo',
}) => {
  const isFooter = variant === 'footer';
  const logoSrc = isFooter ? '/Docsynecx-Logo-footer.svg' : '/Docsynecx-Logo.svg';

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      width={160}
      height={45}
      loading="eager"
      decoding="async"
    />
  );
};

export const AutoDocsLogo = DocsynecxLogo;
export default DocsynecxLogo;
