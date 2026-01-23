"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedText } from "./ui/AnimatedText";

export default function GlowingFeatures() {
  const { t } = useLanguage();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 grid-rows-none gap-3 md:gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<AnimatedText>{t("services.features.fullstack.title")}</AnimatedText>}
        description={<AnimatedText block>{t("services.features.fullstack.description")}</AnimatedText>}
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<AnimatedText>{t("services.features.architecture.title")}</AnimatedText>}
        description={<AnimatedText block>{t("services.features.architecture.description")}</AnimatedText>}
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<AnimatedText>{t("services.features.security.title")}</AnimatedText>}
        description={<AnimatedText block>{t("services.features.security.description")}</AnimatedText>}
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<AnimatedText>{t("services.features.uiux.title")}</AnimatedText>}
        description={<AnimatedText block>{t("services.features.uiux.description")}</AnimatedText>}
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<AnimatedText>{t("services.features.seo.title")}</AnimatedText>}
        description={<AnimatedText block>{t("services.features.seo.description")}</AnimatedText>}
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[12rem] sm:min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl p-1 md:rounded-3xl md:p-1">
        <GlowingEffect
          spread={30}
          glow={false}
          disabled={true}
          proximity={80}
          inactiveZone={0.01}
          borderWidth={1}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 md:gap-6 overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900 p-4 md:p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700/50 shadow-[0_0_15px_rgba(255,255,255,0.03)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <div className="relative flex flex-1 flex-col justify-between gap-3 md:gap-4">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
              {icon}
            </div>
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-sans text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
