type Props = {
  slot: string;
  label?: string;
  className?: string;
};

const AD_CLIENT = "ca-pub-9974301999021865";

export default function AdSlot({ slot, label = "Sponsored", className = "" }: Props) {
  return (
    <aside className={`adSlot ${className}`.trim()} aria-label="Advertisement">
      <p className="adLabel">{label}</p>
      <ins
        className="adsbygoogle"
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
