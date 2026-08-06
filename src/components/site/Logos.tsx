const logos = ["NORTHWIND", "Bluetail", "PIXEL&CO", "ORBIT LABS", "verde", "Skyline", "cadence", "Lumen", "atlas", "MERIDIAN"];

export function Logos() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((l) => (
            <div
              key={l}
              className="grid h-24 place-items-center border-b border-r border-border font-display text-[17px] font-semibold tracking-tight text-muted-foreground/70"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}