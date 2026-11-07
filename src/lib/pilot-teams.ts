import heimatverseLogo from "@/assets/heimatverse-logo.png.asset.json";
import adlanticLogo from "@/assets/adlantic-logo.png.asset.json";

/**
 * Pilot teams currently working with HeiGin. Each mark keeps its own treatment:
 * HeimatVerse is dark on a light tile, ADLantic is a dark tile with a white
 * mark. Imported from any page that wants to show the pilot row.
 */
export interface PilotTeam {
  name: string;
  logo: string;
  /** Tailwind classes for the small logo tile. */
  tile: string;
}

export const pilotTeams: PilotTeam[] = [
  { name: "HeimatVerse", logo: heimatverseLogo.url, tile: "bg-surface ring-1 ring-border" },
  { name: "ADLantic", logo: adlanticLogo.url, tile: "bg-night ring-1 ring-border" },
];
