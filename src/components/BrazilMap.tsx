import { cn } from '@/lib/utils';

interface BrazilMapProps {
  selectedUF: string | null;
  onSelectUF: (uf: string) => void;
  availableUFs: string[];
}

// Simplified Brazil SVG paths per state (UF)
const states: { uf: string; name: string; d: string }[] = [
  { uf: 'AC', name: 'Acre', d: 'M48,210 L68,208 L72,220 L58,228 L44,222 Z' },
  { uf: 'AL', name: 'Alagoas', d: 'M348,186 L360,182 L364,190 L352,194 Z' },
  { uf: 'AM', name: 'Amazonas', d: 'M80,140 L170,135 L175,180 L140,200 L75,195 L68,170 Z' },
  { uf: 'AP', name: 'Amapá', d: 'M210,100 L230,90 L240,110 L225,120 Z' },
  { uf: 'BA', name: 'Bahia', d: 'M300,190 L350,175 L365,200 L355,240 L310,250 L290,230 Z' },
  { uf: 'CE', name: 'Ceará', d: 'M328,145 L355,138 L362,160 L340,168 Z' },
  { uf: 'DF', name: 'Distrito Federal', d: 'M268,232 L278,228 L282,236 L272,240 Z' },
  { uf: 'ES', name: 'Espírito Santo', d: 'M320,260 L338,255 L342,270 L325,275 Z' },
  { uf: 'GO', name: 'Goiás', d: 'M240,225 L280,215 L290,250 L255,262 Z' },
  { uf: 'MA', name: 'Maranhão', d: 'M270,130 L310,120 L325,150 L300,170 L265,165 Z' },
  { uf: 'MG', name: 'Minas Gerais', d: 'M270,250 L330,240 L345,275 L310,295 L265,290 Z' },
  { uf: 'MS', name: 'Mato Grosso do Sul', d: 'M200,270 L245,260 L255,300 L220,310 L195,295 Z' },
  { uf: 'MT', name: 'Mato Grosso', d: 'M150,195 L240,185 L250,230 L200,250 L145,240 Z' },
  { uf: 'PA', name: 'Pará', d: 'M170,110 L260,105 L270,145 L240,175 L175,180 Z' },
  { uf: 'PB', name: 'Paraíba', d: 'M340,162 L370,158 L372,170 L342,174 Z' },
  { uf: 'PE', name: 'Pernambuco', d: 'M335,172 L372,166 L375,182 L338,188 Z' },
  { uf: 'PI', name: 'Piauí', d: 'M300,145 L330,138 L338,172 L310,182 Z' },
  { uf: 'PR', name: 'Paraná', d: 'M220,310 L270,300 L280,325 L235,335 Z' },
  { uf: 'RJ', name: 'Rio de Janeiro', d: 'M300,290 L328,282 L335,298 L310,305 Z' },
  { uf: 'RN', name: 'Rio Grande do Norte', d: 'M345,148 L372,142 L374,158 L348,162 Z' },
  { uf: 'RO', name: 'Rondônia', d: 'M108,210 L148,200 L155,228 L118,238 Z' },
  { uf: 'RR', name: 'Roraima', d: 'M110,80 L145,72 L150,105 L115,112 Z' },
  { uf: 'RS', name: 'Rio Grande do Sul', d: 'M215,348 L260,340 L265,375 L230,385 L210,370 Z' },
  { uf: 'SC', name: 'Santa Catarina', d: 'M230,332 L268,325 L272,345 L235,352 Z' },
  { uf: 'SE', name: 'Sergipe', d: 'M348,188 L360,185 L362,196 L350,198 Z' },
  { uf: 'SP', name: 'São Paulo', d: 'M245,290 L305,280 L315,308 L260,318 Z' },
  { uf: 'TO', name: 'Tocantins', d: 'M260,170 L295,162 L302,200 L272,210 Z' },
];

const BrazilMap = ({ selectedUF, onSelectUF, availableUFs }: BrazilMapProps) => {
  return (
    <svg
      viewBox="30 60 370 340"
      className="w-full max-w-md h-auto"
      role="img"
      aria-label="Mapa do Brasil"
    >
      {states.map((state) => {
        const isSelected = selectedUF === state.uf;
        const isAvailable = availableUFs.includes(state.uf);

        return (
          <g key={state.uf}>
            <path
              d={state.d}
              className={cn(
                "cursor-pointer transition-all duration-300 stroke-border/60 stroke-[0.8]",
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
              x={state.d
                .split(' ')
                .filter((_, i) => i % 2 === 0 && i > 0)
                .map(Number)
                .reduce((a, b, _, arr) => a + b / arr.length, 0) ||
                parseInt(state.d.split(',')[0].replace(/[^0-9]/g, ''), 10)}
              y={state.d
                .split(' ')
                .filter((_, i) => i % 2 === 1)
                .map((s) => parseInt(s.replace(/[^0-9]/g, ''), 10))
                .reduce((a, b, _, arr) => a + b / arr.length, 0) || 0}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground/60 text-[7px] font-medium pointer-events-none select-none"
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
