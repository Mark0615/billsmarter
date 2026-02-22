type Props = {
  slot: string;
  label?: string;
  className?: string;
};

export default function AdSlot({ slot, label = "Sponsored", className = "" }: Props) {
  return (
    <aside className={`adSlot ${className}`.trim()} aria-label="Advertisement">
      <p className="adLabel">{label}</p>
      <ins className="adsbygoogle" data-ad-client="ca-pub-xxxxxxxxxxxxxxxx" data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
