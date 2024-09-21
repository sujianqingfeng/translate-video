import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { Download } from "lucide-react"
import { Button } from "~/components/ui/button"
import DownloadDialog from "~/components/business/download/DownloadDialog"

function DownloadPage() {
	const onConfirm = (link: string) => {
		console.log(link)
	}

	return (
		<div>
			<div className="flex justify-end">
				<DownloadDialog onConfirm={onConfirm}>
					<Button size="icon" variant="link">
						<Download />
					</Button>
				</DownloadDialog>
			</div>
		</div>
	)
}

export const Route = createLazyFileRoute("/")({
	component: DownloadPage,
})
