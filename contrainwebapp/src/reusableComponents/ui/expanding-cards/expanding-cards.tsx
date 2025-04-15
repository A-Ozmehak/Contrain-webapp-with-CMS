"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from './expanding-cards.module.css';

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  backgroundUrl: string;
}

interface ExpandingCardsProps {
  items: CardItem[];
  className?: string;
}

export default function ExpandingCardsComponent({ items, className }: ExpandingCardsProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id);

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center min-h-[400px] w-full max-w-[900px] items-stretch gap-2 px-4",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "ease-[cubic-bezier(0.05,0.61,0.41,0.95)] relative cursor-pointer overflow-hidden bg-cover bg-center transition-all duration-700",
            activeId === item.id
            ? "flex-[10_1_0%] sm:flex-[10_1_0%] w-full sm:w-auto rounded-[40px]"
            : "flex-[1_1_0%] sm:flex-[1_1_0%] w-full sm:w-auto rounded-[30px]",
          )}
          style={{
            backgroundImage: `url(${item.backgroundUrl})`,
          }}
          onClick={() => setActiveId(item.id)}
        >
          <div
            className={cn(
              "ease-[cubic-bezier(0.05,0.61,0.41,0.95)] absolute inset-x-0 bottom-0 transition-all duration-700",
              activeId === item.id
                ? "h-[120px] bg-linear-to-t from-black/80 to-transparent"
                : "h-0 bg-linear-to-t from-black/80 to-transparent opacity-0",
            )}
          />

          <div>
            <div className={styles.expandingCardCard}>
              <div className="ml-3 text-white">
                <div
                    className={cn(
                      "ease-[cubic-bezier(0.05,0.61,0.41,0.95)] text-lg font-bold transition-all duration-700",
                      activeId === item.id
                        ? "translate-x-0 opacity-100"
                        : "translate-x-5 opacity-0",
                    )}
                  >
                    {item.title}
                  </div>
                <div
                   className={cn(
                    "ease-[cubic-bezier(0.05,0.61,0.41,0.95)] text-sm text-white/80 transition-all delay-100 duration-700",
                    activeId === item.id
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0",
                  )}
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
