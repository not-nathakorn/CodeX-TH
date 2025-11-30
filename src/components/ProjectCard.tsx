import { GlassCard } from "./GlassCard";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  icon?: string;
  tags?: string[];
}

export const ProjectCard = ({ title, description, url, icon, tags }: ProjectCardProps) => {
  return (
    <GlassCard hover glow className="group animate-scale-in">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && <span className="text-3xl">{icon}</span>}
            <h3 className="text-xl font-semibold text-foreground group-hover:gradient-text transition-all">
              {title}
            </h3>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full glass-strong text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </GlassCard>
  );
};
