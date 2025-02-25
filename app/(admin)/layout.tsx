
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/utils/supabase/server";
import clsx from "clsx";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/properties", label: "Properties" },
    ]
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <nav className={clsx("w-full z-50 flex justify-center border-b border-b-foreground/10 h-16")}>
                <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                        <Link href={"/"} className="text-2xl">JUSTIN</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <ThemeSwitcher /> */}
                        {user && user.email}
                        <form action={signOutAction}>
                            <Button type="submit" variant={"outline"}>
                                Sign out
                            </Button>
                        </form>
                    </div>
                </div>
            </nav>
            <main className="h-screen flex">
                <aside className="w-64 p-4 border-r h-full">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.href} className="mb-2 hover:bg-gray-600 px-3 py-2 rounded-sm">
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}

                    </ul>
                </aside>
                <div className="flex-1 p-4">
                    {children}
                </div>
            </main>
        </ThemeProvider>
    );
}
