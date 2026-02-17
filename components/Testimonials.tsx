import { siteContent } from "@/content/site";
import { Card } from "@/components/Card";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {siteContent.testimonials.map((item) => (
        <Card key={item.name}>
          <p className="text-sm leading-relaxed text-foreground/80">“{item.quote}”</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accentDark text-xs font-semibold text-background">
              {initials(item.name)}
            </div>
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-foreground/65">{item.role}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
