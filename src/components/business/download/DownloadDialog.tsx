import { Button } from "~/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form"
import { type ReactNode, useState } from "react"

const formSchema = z.object({
	link: z.string().min(10, {
		message: "Youtube video url is required.",
	}),
})

type DownloadDialogProps = {
	children: ReactNode
	onConfirm: (link: string) => void
}
function DownloadDialog({ children, onConfirm }: DownloadDialogProps) {
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			link: "",
		},
	})

	function onSubmit(value: z.infer<typeof formSchema>) {
		setOpen(false)
		onConfirm(value.link)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<DialogHeader>
							<DialogTitle>Download</DialogTitle>

							<DialogDescription>
								Download youtube video to your device.
							</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="link"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Paste youtube video url here"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className="justify-end">
							<Button type="submit">Confirm</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default DownloadDialog
