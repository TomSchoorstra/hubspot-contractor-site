export default function ContentIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    automation: <><rect x="3" y="3" width="6" height="6" rx="2" /><rect x="15" y="15" width="6" height="6" rx="2" /><path d="M6 9v6a3 3 0 0 0 3 3h6M9 6h6a3 3 0 0 1 3 3v6" /></>,
    consultancy: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M7 10h6M10 7v6" /></>,
    integrations: <><path d="M9 8H7a4 4 0 0 0 0 8h2M15 8h2a4 4 0 0 1 0 8h-2M8 12h8" /><path d="m14 10 2 2-2 2" /></>,
    "custom-objects": <><rect x="8" y="2" width="8" height="7" rx="2" /><rect x="2" y="16" width="7" height="6" rx="2" /><rect x="15" y="16" width="7" height="6" rx="2" /><path d="M12 9v4M5.5 16v-3h13v3" /></>,
    "pipeline-optimization": <><path d="M4 20V4M4 20h17M8 15l4-5 4 2 5-7M17 5h4v4" /></>,
    "custom-app-cards": <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M14 9v11M7 13h3M7 16h3M17 13h1" /></>,
    article: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">{paths[name] ?? paths.article}</svg>;
}
