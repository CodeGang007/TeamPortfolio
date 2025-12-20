import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { SocialLinks as SocialLinksType } from './types';

interface SocialLinksProps {
  links: SocialLinksType;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex items-center space-x-3 text-slate-400">
      {links.linkedin && (
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#0077b5]"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#333]"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
      )}
      {links.instagram && (
        <a
          href={links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#E1306C]"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      )}
    </div>
  );
};