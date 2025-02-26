import Navbar from "@/components/navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      <main className="min-h-screen">
        <div className="h-screen items-center justify-center flex ">
          <div className="mx-2 md:mx-auto container max-w-96 bg-gray-900 p-5 rounded-lg text-white">
            {children}
          </div>
        </div>
      </main>
      <footer className=" w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
        <p>
          Copyright Justin Angelo Perez 2025
        </p>
        {/* <ThemeSwitcher /> */}
      </footer>
    </ThemeProvider>

  );
}
