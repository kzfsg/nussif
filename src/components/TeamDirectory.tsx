import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  mountDirectory,
  type DirectoryInstance,
} from './team-directory/engine';
import markup from './team-directory/markup.html?raw';
import stylesheet from './team-directory/directory.css?raw';
import people from './team-directory/people.json';
import descriptions from './team-directory/descriptions.json';

const aliases: Record<string, string> = {
  leadership: 'leadership',
  investing: 'equities',
  'ls-equities': 'equities',
  'global-macro-commodities': 'macro',
  'systematic-strategies': 'syst',
  operations: 'risk',
  developers: 'risk',
  risk: 'risk',
  externals: 'ext',
  'global-research': 'gr',
};

export default function TeamDirectory() {
  const hostRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<DirectoryInstance | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>${stylesheet}</style>${markup}`;

    const directory = mountDirectory(shadow, {
      data: people,
      descriptions,
      names: { risk: 'Developers' },
      categories: { risk: 'DEVELOPERS' },
      embedded: true,
      showExperience: false,
    });

    directoryRef.current = directory;

    return () => {
      directory.destroy();
      directoryRef.current = null;
      shadow.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const key = aliases[hash.slice(1)];
    if (key) directoryRef.current?.openTeam(key);
  }, [hash]);

  return (
    <section
      id="team-directory"
      aria-label="NUSSIF team directory"
      className="scroll-mt-20"
    >
      <div ref={hostRef} />
    </section>
  );
}
