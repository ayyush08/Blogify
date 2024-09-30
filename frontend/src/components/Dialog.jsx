import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdEditSquare } from "react-icons/md";

export function DialogDemo({ trigger, title,username,fullName,email }) {
    return (
        <Dialog>
            <DialogTrigger className="bg-teal-400 dark:hover:bg-teal-600 dark:bg-teal-700 rounded-xl italic hover:bg-teal-300" asChild>
                <Button variant="outline">Edit Profile
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Full Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullname" className="text-right">
                            Full Name
                        </Label>
                        <Input
                            id="fullname"
                            defaultValue={fullName}
                            className="col-span-3"
                        />
                    </div>

                    {/* Username */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue={username}
                            className="col-span-3"
                        />
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue={email}
                            className="col-span-3"
                        />
                    </div>

                   
                </div>
                <DialogFooter >
                    <Button  type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
