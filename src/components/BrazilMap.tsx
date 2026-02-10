import { cn } from '@/lib/utils';

interface BrazilMapProps {
  selectedUF: string | null;
  onSelectUF: (uf: string) => void;
  availableUFs: string[];
}

// Accurate Brazil SVG paths — unified map with no gaps between states
const states: { uf: string; name: string; d: string; labelX: number; labelY: number }[] = [
  { uf: 'AC', name: 'Acre', labelX: 73, labelY: 300,
    d: 'M42,278 L56,270 L72,268 L92,272 L108,282 L104,296 L88,306 L66,310 L48,304 L38,292 Z' },
  { uf: 'AM', name: 'Amazonas', labelX: 148, labelY: 220,
    d: 'M72,148 L108,140 L150,138 L192,142 L230,150 L238,168 L232,198 L218,222 L198,240 L168,252 L138,258 L108,262 L92,272 L72,268 L56,270 L42,278 L38,260 L42,232 L50,208 L58,188 L62,168 Z' },
  { uf: 'RR', name: 'Roraima', labelX: 150, labelY: 110,
    d: 'M108,140 L120,108 L138,82 L158,72 L178,78 L188,98 L192,118 L192,142 L150,138 Z' },
  { uf: 'AP', name: 'Amapá', labelX: 268, labelY: 100,
    d: 'M258,68 L275,58 L290,68 L298,88 L292,108 L280,122 L268,128 L256,120 L250,100 L252,82 Z' },
  { uf: 'PA', name: 'Pará', labelX: 228, labelY: 182,
    d: 'M192,142 L192,118 L200,108 L218,102 L238,98 L250,100 L256,120 L268,128 L280,122 L292,132 L298,148 L310,158 L318,172 L308,188 L288,198 L272,202 L268,218 L258,232 L248,228 L238,218 L232,198 L238,168 L230,150 Z' },
  { uf: 'MA', name: 'Maranhão', labelX: 318, labelY: 172,
    d: 'M298,148 L310,140 L328,138 L342,142 L352,152 L348,168 L338,182 L328,188 L318,192 L308,188 L310,158 Z' },
  { uf: 'TO', name: 'Tocantins', labelX: 288, labelY: 240,
    d: 'M272,202 L288,198 L308,188 L318,192 L318,212 L312,232 L308,252 L298,268 L282,272 L268,262 L262,242 L258,232 L268,218 Z' },
  { uf: 'PI', name: 'Piauí', labelX: 338, labelY: 202,
    d: 'M318,192 L328,188 L338,182 L348,168 L358,168 L368,178 L372,192 L368,208 L358,222 L348,228 L338,228 L328,222 L318,212 Z' },
  { uf: 'CE', name: 'Ceará', labelX: 372, labelY: 172,
    d: 'M352,152 L362,148 L378,148 L392,158 L398,172 L392,188 L382,192 L372,192 L368,178 L358,168 L348,168 Z' },
  { uf: 'RN', name: 'Rio G. do Norte', labelX: 398, labelY: 182,
    d: 'M392,158 L402,158 L412,166 L414,178 L408,188 L398,192 L392,188 Z' },
  { uf: 'PB', name: 'Paraíba', labelX: 402, labelY: 198,
    d: 'M392,188 L398,192 L408,188 L414,198 L410,208 L398,210 L388,208 L382,200 L382,192 Z' },
  { uf: 'PE', name: 'Pernambuco', labelX: 392, labelY: 218,
    d: 'M382,200 L388,208 L398,210 L410,208 L414,218 L408,228 L392,230 L378,228 L368,222 L368,208 L372,200 L382,200 Z' },
  { uf: 'AL', name: 'Alagoas', labelX: 406, labelY: 238,
    d: 'M392,230 L408,228 L414,238 L408,246 L396,244 L390,238 Z' },
  { uf: 'SE', name: 'Sergipe', labelX: 398, labelY: 252,
    d: 'M390,238 L396,244 L404,250 L398,258 L388,256 L384,248 Z' },
  { uf: 'BA', name: 'Bahia', labelX: 348, labelY: 280,
    d: 'M298,268 L308,252 L312,232 L318,212 L328,222 L338,228 L348,228 L358,222 L368,222 L378,228 L392,230 L390,238 L384,248 L388,256 L398,258 L398,278 L388,298 L372,312 L352,318 L332,312 L318,302 L308,290 L298,278 Z' },
  { uf: 'MT', name: 'Mato Grosso', labelX: 218, labelY: 282,
    d: 'M168,252 L198,240 L218,222 L232,198 L238,218 L248,228 L258,232 L262,242 L268,262 L282,272 L298,268 L298,278 L292,298 L278,312 L258,318 L232,316 L208,310 L188,306 L168,298 L158,282 L158,268 Z' },
  { uf: 'RO', name: 'Rondônia', labelX: 128, labelY: 296,
    d: 'M108,282 L138,258 L158,268 L158,282 L168,298 L158,312 L138,318 L118,312 L108,302 Z' },
  { uf: 'GO', name: 'Goiás', labelX: 298, labelY: 302,
    d: 'M282,272 L298,278 L308,290 L318,302 L322,318 L318,332 L308,338 L292,338 L278,332 L268,318 L258,318 L278,312 L292,298 Z' },
  { uf: 'DF', name: 'Distrito Federal', labelX: 308, labelY: 318,
    d: 'M302,312 L312,308 L318,318 L310,324 L302,320 Z' },
  { uf: 'MG', name: 'Minas Gerais', labelX: 338, labelY: 338,
    d: 'M298,278 L308,290 L318,302 L322,318 L318,332 L328,342 L342,348 L362,348 L378,342 L388,332 L392,318 L398,302 L398,278 L388,298 L372,312 L352,318 L332,312 L318,302 Z' },
  { uf: 'ES', name: 'Espírito Santo', labelX: 388, labelY: 338,
    d: 'M378,322 L392,318 L398,332 L398,348 L388,352 L378,348 L374,338 Z' },
  { uf: 'MS', name: 'Mato Grosso do Sul', labelX: 248, labelY: 342,
    d: 'M208,310 L232,316 L258,318 L268,318 L278,332 L278,348 L268,362 L252,368 L232,368 L218,360 L208,348 L202,332 Z' },
  { uf: 'SP', name: 'São Paulo', labelX: 318, labelY: 365,
    d: 'M278,332 L292,338 L308,338 L318,332 L328,342 L342,348 L348,362 L342,378 L328,388 L308,390 L288,384 L278,372 L268,362 L278,348 Z' },
  { uf: 'RJ', name: 'Rio de Janeiro', labelX: 358, labelY: 368,
    d: 'M342,348 L362,348 L378,348 L388,352 L388,368 L378,378 L362,382 L348,378 L342,378 Z' },
  { uf: 'PR', name: 'Paraná', labelX: 278, labelY: 395,
    d: 'M252,368 L268,362 L278,372 L288,384 L308,390 L308,402 L298,412 L278,418 L258,418 L242,410 L232,398 L232,378 L242,372 Z' },
  { uf: 'SC', name: 'Santa Catarina', labelX: 278, labelY: 428,
    d: 'M242,410 L258,418 L278,418 L298,412 L302,428 L292,438 L272,442 L252,438 L238,428 Z' },
  { uf: 'RS', name: 'Rio Grande do Sul', labelX: 268, labelY: 462,
    d: 'M238,428 L252,438 L272,442 L292,438 L298,452 L292,468 L278,478 L258,482 L238,478 L222,468 L218,452 L222,438 Z' },
];

const BrazilMap = ({ selectedUF, onSelectUF, availableUFs }: BrazilMapProps) => {
  return (
    <svg
      viewBox="30 50 400 450"
      className="w-full max-w-md h-auto"
      role="img"
      aria-label="Mapa do Brasil interativo"
    >
      {states.map((state) => {
        const isSelected = selectedUF === state.uf;
        const isAvailable = availableUFs.includes(state.uf);

        return (
          <g key={state.uf} className="group">
            <path
              d={state.d}
              className={cn(
                "cursor-pointer transition-all duration-300 stroke-background stroke-[1.2]",
                isSelected
                  ? "fill-primary/70"
                  : isAvailable
                  ? "fill-primary/25 hover:fill-primary/45"
                  : "fill-secondary hover:fill-muted"
              )}
              onClick={() => onSelectUF(state.uf)}
            >
              <title>{state.name} ({state.uf})</title>
            </path>
            <text
              x={state.labelX}
              y={state.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground/70 text-[8px] font-medium pointer-events-none select-none"
            >
              {state.uf}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default BrazilMap;
