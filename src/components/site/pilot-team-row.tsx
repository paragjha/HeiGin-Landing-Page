import { pilotTeams } from "@/lib/pilot-teams";

/**
 * Quiet logo row introducing the pilot teams. Used on the home page right
 * under the hero; also planned for About and Solutions.
 *
 * `label` defaults to the home-page copy; override for other pages.
 */
export function PilotTeamRow({ label = "Built with pilot teams" }: { label?: string } = {}) {
  return (
    <section className="border-b border-border">
      <div className="container-site py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-faint">
          {label}
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {pilotTeams.map((team) => (
            <li key={team.name} className="flex items-center gap-2.5">
              <span
                className={`flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md ${team.tile}`}
              >
                <img src={team.logo} alt="" className="size-full object-contain" />
              </span>
              <span className="text-md font-semibold tracking-tight text-foreground">{team.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
