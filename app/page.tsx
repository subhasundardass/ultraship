import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/employees");
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  //       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
  //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
  //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
  //             Test application .
  //           </h1>
  //           {/* TECH STACK */}
  //           <section className="space-y-3">
  //             <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
  //               Technology Stack
  //             </h2>

  //             <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-1">
  //               <li>
  //                 <strong>Next.js (App Router)</strong> – Fast, SEO-friendly
  //                 frontend with API support
  //               </li>
  //               <li>
  //                 <strong>TypeScript</strong> – Type safety and maintainable code
  //               </li>
  //               <li>
  //                 <strong>Tailwind CSS + shadcn/ui</strong> – Clean, modern UI
  //                 components
  //               </li>
  //               <li>
  //                 <strong>GraphQL (Yoga GraphiQL)</strong> – Flexible and
  //                 efficient data fetching
  //               </li>
  //               <li>
  //                 <strong>PostgreSQL (Neon Cloud)</strong> – Scalable cloud
  //                 database
  //               </li>
  //               <li>
  //                 <strong>Vercel</strong> – Production-grade hosting and CI/CD
  //               </li>
  //             </ul>
  //           </section>
  //           <section className="space-y-3">
  //             <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
  //               URLs
  //             </h2>
  //             <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-1">
  //               <li>
  //                 <strong>GrapgQL</strong> –
  //                 <a href="https://ultraship-pi.vercel.app/api/graphql">
  //                   https://ultraship-pi.vercel.app/api/graphql
  //                 </a>
  //               </li>
  //               <li>
  //                 <strong>Employee</strong> –
  //                 <a href="https://ultraship-pi.vercel.app/employees">
  //                   https://ultraship-pi.vercel.app/employees
  //                 </a>
  //               </li>
  //               <li>
  //                 <strong>Github</strong> –
  //                 <a href="hhttps://github.com/subhasundardass/ultraship">
  //                   https://github.com/subhasundardass/ultraship
  //                 </a>
  //               </li>
  //             </ul>
  //           </section>
  //           Grapgql example
  //           <div style={{ padding: 0 }}>
  //             <pre
  //               style={{
  //                 // background: "#0f172a",
  //                 // color: "#e5e7eb",
  //                 padding: "16px",
  //                 borderRadius: "8px",
  //                 width: "100%",
  //               }}
  //             >
  //               <code>{`
  // query {
  //   listEmployees {
  //     id
  //     name
  //     age
  //     designation
  //     gender
  //     attendence
  //   }
  // }
  //         `}</code>
  //             </pre>
  //           </div>
  //         </div>
  //       </main>
  //     </div>
  //   );
}
