import { createLazyFileRoute } from "@tanstack/react-router"
import { Download } from "lucide-react"
import { Button } from "~/components/ui/button"
import DownloadDialog from "~/components/business/download/DownloadDialog"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table"
import { useState, useEffect } from "react"
import { Store } from "tauri-plugin-store-api"
import { invoke } from "@tauri-apps/api/tauri"
import { YOUTUBE_LINKS_KEY, STORE_NAME } from "~/constants"

interface YouTubeLink {
	url: string
	// 0:"pending" | 1:"downloaded" | 2:"failed"
	status: 0 | 1 | 2
}

const store = new Store(STORE_NAME)

function DownloadPage() {
	const [links, setLinks] = useState<YouTubeLink[]>([])

	useEffect(() => {
		loadLinks()
	}, [])

	const loadLinks = async () => {
		try {
			const loadedLinks =
				(await store.get<YouTubeLink[]>(YOUTUBE_LINKS_KEY)) || []
			setLinks(loadedLinks)
		} catch (error) {
			console.error("Failed to load links:", error)
		}
	}

	const onConfirm = async (url: string) => {
		const newLink: YouTubeLink = { url, status: 0 }
		const updatedLinks = [...links, newLink]
		setLinks(updatedLinks)

		try {
			await store.set(YOUTUBE_LINKS_KEY, updatedLinks)
			await store.save()

			const result = await invoke<{ success: boolean; message: string }>(
				"download_youtube_video",
				{ url },
			)

			console.log("🚀 ~ onConfirm ~ result:", result)
		} catch (error) {
			console.error("Failed to download video:", error)
		}
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

			<Table>
				<TableCaption>A list of your downloaded videos.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Url</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{links.map((link) => (
						<TableRow key={link.url}>
							<TableCell>{link.url}</TableCell>
							<TableCell>{link.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export const Route = createLazyFileRoute("/")({
	component: DownloadPage,
})
