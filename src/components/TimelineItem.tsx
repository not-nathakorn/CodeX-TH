import { GlassCard } from "./GlassCard";

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
}

export const TimelineItem = ({ year, title, subtitle, description, badge }: TimelineItemProps) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 animate-fade-in">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gradient-primary animate-pulse-glow" />
      
      {/* Timeline line */}
      <div className="absolute left-[5px] top-5 w-0.5 h-full bg-border" />
      
      <GlassCard hover={false} className="animate-slide-up">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {year}
          </span>
          {badge && (
            <span className="px-2 py-1 text-xs rounded-full glass-strong text-accent font-medium">
              {badge}
            </span>
          )}
        </div>
        
        <h4 className="text-lg font-semibold text-foreground mb-1">{title}</h4>
        
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
        )}
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </GlassCard>
    </div>
  );
};
