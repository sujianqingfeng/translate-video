import { createRootRoute, Outlet, Link } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Package2, Download, Info } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/ui/tooltip"

const menus = [
	{
		name: "Download",
		icon: Download,
		href: "/",
	},
	{
		name: "About",
		icon: Info,
		href: "/about",
	},
]

function Aside() {
	return (
		<aside className="flex h-screen w-14 flex-col border-r bg-background">
			<nav className="flex flex-1 flex-col items-center gap-4 p-2">
				<p className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
					<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
				</p>

				{menus.map((menu) => (
					<Tooltip key={menu.href}>
						<TooltipTrigger asChild>
							<Link
								to={menu.href}
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<menu.icon className="h-5 w-5" />
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{menu.name}</TooltipContent>
					</Tooltip>
				))}
			</nav>
		</aside>
	)
}

function MainContent() {
	return (
		<div className="flex-auto p-2">
			<Outlet />
		</div>
	)
}

function RootLayout() {
	return (
		<>
			<TooltipProvider>
				<div className="flex">
					<Aside />
					<MainContent />
				</div>
			</TooltipProvider>
			<TanStackRouterDevtools />
		</>
	)
}

export const Route = createRootRoute({
	component: RootLayout,
})
