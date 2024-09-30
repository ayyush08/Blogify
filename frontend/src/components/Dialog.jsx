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
import { useEffect, useState} from "react";
import { useUpdateUserProfile } from "@/hooks/user.hook";
import toast from "react-hot-toast";
import { updateDetails } from "@/store/authSlice";
import { useSelector,useDispatch } from "react-redux";
export function DialogDemo({  title,username,fullName,email }) {
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    console.log(
        "User Data",
        userData
    );
    useEffect(()=>{

    },[userData])
    const {mutateAsync:updateProfile,isPending:updating}  = useUpdateUserProfile();
    const [newData, setNewData] = useState({fullName:fullName,username:username,email:email});
    const handleUpdateProfile = async () => {
        try {
            const update = await updateProfile({fullName: newData.fullName, username: newData.username, email: newData.email});
            if(update){
                dispatch(updateDetails(update.data));
                console.log("Profile Updated Successfully",update);
            }
            else{
                console.log("Profile Update Failed");
            }
            if(updating){
                console.log("Profile Update Pending");
                
            }
        } catch (error) {
            toast.error("Profile Update Failed");
        }
        console.log("New Data", newData)
    }
    return (
        <Dialog>
            <DialogTrigger className="bg-teal-400 dark:hover:bg-teal-600 dark:bg-teal-700 rounded-xl italic hover:bg-teal-300" asChild>
                <Button variant="outline">Edit Profile  <MdEditSquare className="ml-1"/>
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-teal-500/60 dark:bg-teal-800/80">
                <DialogHeader>
                    <DialogTitle className="font-motserrat font-bold italic">{title}
                    </DialogTitle>
                    <DialogDescription className="font-motserrat dark:text-gray-400 text-slate-800 font-semibold">
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
                            defaultValue={newData.fullName}
                            onChange={(e) => setNewData({ ...newData, fullName: e.target.value })}
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
                            defaultValue={newData.username}
                            onChange={(e) => setNewData({ ...newData, username: e.target.value })}
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
                            defaultValue={newData.email}
                            onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                            className="col-span-3  dark:bg-white dark:placeholder:text-black dark:text-black dark:ring-teal-300" 
                        />
                    </div>

                </div>
                <DialogFooter >
                    <Button onClick={handleUpdateProfile} className="dark:bg-cyan-500 bg-blue-600/70 hover:bg-blue-900 dark:text-white dark:hover:bg-cyan-700 font-motserrat"  type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
