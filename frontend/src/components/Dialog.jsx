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
                <Button variant="outline">Edit Profile  <MdEditSquare className="ml-1"/>
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-teal-800/80">
                <DialogHeader>
                    <DialogTitle className="font-motserrat font-semibold">{title}
                    </DialogTitle>
                    <DialogDescription className="font-motserrat">
                        Make changes to your profile details here. <br/>Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Full Name */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fullname" className="text-right font-mono  text-md">
                            Full Name
                        </Label>
                        <Input
                            
                            id="fullname"
                            defaultValue={fullName}
                            className="col-span-3 dark:bg-white dark:placeholder:text-black dark:text-black dark:ring-teal-300 "
                        />
                    </div>

                    {/* Username */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right font-mono  text-md">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue={username}
                            className="col-span-3  dark:bg-white dark:placeholder:text-black dark:text-black dark:ring-teal-300"
                        />
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right font-mono  text-md">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue={email}
                            className="col-span-3  dark:bg-white dark:placeholder:text-black dark:text-black dark:ring-teal-300" 
                        />
                    </div>

                   
                </div>
                <DialogFooter >
                    <Button className="dark:bg-cyan-500 dark:text-white dark:hover:bg-cyan-700 font-motserrat"  type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
