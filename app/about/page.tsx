import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemMedia,
  Item,
} from "@/components/ui/item";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Technology Stack & Architecture</CardTitle>
            <CardDescription>
              This application is built using modern, production-ready
              technologies chosen for performance, scalability, and long-term
              support.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>NextJs 16 (latest)</ItemTitle>
                <ItemDescription>
                  Used for building a fast, SEO-friendly, and scalable web
                  application with server-side rendering, routing, and modern
                  React features. Ensures excellent performance and future-proof
                  architecture.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>GraphQL (Yoga)</ItemTitle>
                <ItemDescription>
                  Provides a flexible and efficient API layer where the frontend
                  fetches only the data it needs. This reduces network usage,
                  improves performance, and simplifies frontend-backend
                  communication.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>PostgreSQL Database</ItemTitle>
                <ItemDescription>
                  A robust, enterprise-grade relational database known for data
                  integrity, reliability, and performance. Ideal for complex
                  business data and long-term scalability.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Shadcn UI</ItemTitle>
                <ItemDescription>
                  A modern, accessible, and customizable UI component system
                  built on Tailwind CSS. Ensures a clean design, consistency,
                  and easy future customization.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Vercel Deployment</ItemTitle>
                <ItemDescription>
                  Deployed on Vercel for high availability, global CDN,
                  automatic scaling, and seamless CI/CD. Ensures fast load times
                  and reliable production hosting.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Links</ItemTitle>
                <ItemDescription>
                  <>
                    <a href="https://ultraship-pi.vercel.app/api/graphql">
                      https://ultraship-pi.vercel.app/api/graphql
                    </a>
                  </>
                  <>
                    {" "}
                    <a href="hhttps://github.com/subhasundardass/ultraship">
                      https://github.com/subhasundardass/ultraship
                    </a>
                  </>
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
